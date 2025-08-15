"use client";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef } from "react";

type OGLRenderingContext =
  (WebGLRenderingContext & { canvas: HTMLCanvasElement }) |
  (WebGL2RenderingContext & { canvas: HTMLCanvasElement });

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(
  gl: OGLRenderingContext,
  text: string,
  font = "bold 30px monospace",
  color = "black",
  maxWidth?: number
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get canvas context");

  // Set initial font to measure text
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = parseInt(font, 10);
  const textHeight = Math.ceil(fontSize * 1.2);
  
  // Calculate dimensions
  let actualWidth = maxWidth && textWidth > maxWidth ? maxWidth : textWidth;
  let actualHeight = textHeight;
  
  // Handle text wrapping if needed
  if (maxWidth && textWidth > maxWidth) {
    const words = text.split(' ');
    let line = '';
    let lineCount = 0;
    const lineHeight = textHeight;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const testWidth = context.measureText(testLine).width;
      if (testWidth > maxWidth && n > 0) {
        line = words[n] + ' ';
        lineCount++;
      } else {
        line = testLine;
      }
    }
    lineCount++;
    actualHeight = lineCount * lineHeight;
  }
  canvas.width = actualWidth;
  canvas.height = actualHeight;
  
  // Redraw context with new dimensions
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw text with wrapping if needed
  if (maxWidth && textWidth > maxWidth) {
    const words = text.split(' ');
    let line = '';
    let y = (canvas.height - actualHeight) / 2 + fontSize / 2;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const testWidth = context.measureText(testLine).width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, canvas.width / 2, y);
        line = words[n] + ' ';
        y += fontSize * 1.2;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, canvas.width / 2, y);
  } else {
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  }

  const texture = new Texture(gl as any, { 
    generateMipmaps: false,
    image: canvas,
    wrapS: gl.CLAMP_TO_EDGE,
    wrapT: gl.CLAMP_TO_EDGE,
    minFilter: gl.LINEAR,
    magFilter: gl.LINEAR,
    format: gl.RGBA,
    internalFormat: gl.RGBA,
    type: gl.UNSIGNED_BYTE,
    premultiplyAlpha: false,
    unpackAlignment: 1,
    flipY: false // Changed to false for correct texture orientation
  });
  
  return { 
    texture, 
    width: canvas.width, 
    height: canvas.height 
  };
}

class Title {
  gl: OGLRenderingContext;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  mesh: Mesh;
  position: 'top' | 'bottom';
  maxWidth?: number;

  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor = "#ffffff",
    font = "bold 30px sans-serif",
    position = 'bottom',
    maxWidth
  }: {
    gl: OGLRenderingContext;
    plane: Mesh;
    renderer: Renderer;
    text: string;
    textColor?: string;
    font?: string;
    position?: 'top' | 'bottom';
    maxWidth?: number;
  }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.renderer = renderer;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.position = position;
    this.maxWidth = maxWidth;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(
      this.gl,
      this.text,
      this.font,
      this.textColor,
      this.maxWidth
    );
    
    const geometry = new Plane(this.renderer.gl);
    const program = new Program(this.renderer.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });

    this.mesh = new Mesh(this.renderer.gl, { geometry, program });
    
    // Calculate size based on plane dimensions
    const textHeight = this.plane.scale.y * 0.1;
    const aspect = width / height;
    const textWidth = textHeight * aspect;
    
    this.mesh.scale.set(textWidth, textHeight, 1);
    
    // Position based on top/bottom setting
    const verticalOffset = this.plane.scale.y * 0.5 + textHeight * 0.5 + 0.05;
    this.mesh.position.y = this.position === 'top' ? verticalOffset : -verticalOffset;
    this.mesh.position.z = 0.01; // Slightly in front of the plane
    
    this.mesh.setParent(this.plane);
  }
}

interface MediaItem {
  image: string;
  text: string;
  role: string;
}

class Media {
  extra: number = 0;
  geometry: Plane;
  gl: OGLRenderingContext;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  text: string;
  role: string;
  viewport: { width: number; height: number };
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  program: Program;
  plane: Mesh;
  title: Title | null = null;
  roleTitle: Title | null = null;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;
  padding: number = 0;
  width: number = 0;
  widthTotal: number = 0;
  x: number = 0;
  scale: number = 0;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    role,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font,
  }: {
    geometry: Plane;
    gl: OGLRenderingContext;
    image: string;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: { width: number; height: number };
    text: string;
    role: string;
    viewport: { width: number; height: number };
    bend: number;
    textColor: string;
    borderRadius?: number;
    font: string;
  }) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.role = role;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitles();
  }

  createShader() {
    const texture = new Texture(this.renderer.gl, {
      generateMipmaps: false,
    });
    
    this.program = new Program(this.renderer.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = 0.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 0 },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
    img.onerror = () => {
      console.error("Failed to load image:", this.image);
      // Fallback to a placeholder if image fails to load
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#333";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#fff";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Image not loaded", canvas.width/2, canvas.height/2);
        texture.image = canvas;
        this.program.uniforms.uImageSizes.value = [canvas.width, canvas.height];
      }
    };
  }

  createMesh() {
    this.plane = new Mesh(this.renderer.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
    this.onResize(); // Initialize size
  }

  createTitles() {
    // Remove existing titles if they exist
    if (this.title) this.title.mesh.setParent(null);
    if (this.roleTitle) this.roleTitle.mesh.setParent(null);

    // Main title at bottom (name)
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.text,
      textColor: this.textColor,
      font: this.font,
      position: 'bottom'
    });

    // Role title at top (role/designation)
    this.roleTitle = new Title({
      gl: this.gl,
      plane: this.plane,
      renderer: this.renderer,
      text: this.role,
      textColor: this.textColor,
      font: 'bold 24px ' + this.font.split(' ').slice(1).join(' '),
      position: 'top',
      maxWidth: this.plane.scale.x * 0.9 // Slightly wider max width for role
    });
  }

  update(scroll: { current: number; last: number }, direction: string) {
    if (!this.plane) return;

    this.plane.position.x = this.x - scroll.current - this.extra;
    this.plane.position.y = 0;
    this.plane.rotation.z = 0;

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
    }

    // Adjust card sizes and spacing
    this.scale = this.screen.height / 2200;
    this.plane.scale.y = (this.viewport.height * (650 * this.scale)) / this.screen.height; // Slightly reduce card height
    this.plane.scale.x = (this.viewport.width * (500 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 0.2; // Reduce padding between cards
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;

    // Recreate titles with new dimensions
    this.createTitles();
  }
}

class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number; position: number };
  onCheckDebounce: (...args: any[]) => void;
  renderer: Renderer;
  gl: OGLRenderingContext;
  camera: Camera;
  scene: Transform;
  planeGeometry: Plane;
  mediasImages: MediaItem[];
  medias: Media[];
  screen: { width: number; height: number };
  viewport: { width: number; height: number };
  raf: number;
  isDown: boolean = false;
  start: number = 0;
  boundOnResize: () => void;
  boundOnWheel: (e: WheelEvent) => void;
  boundOnTouchDown: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp: () => void;

  constructor(
    container: HTMLElement,
    {
      items,
      bend = 1,
      textColor = "#ffffff",
      borderRadius = 0.05,
      font = "bold 30px Figtree",
      scrollSpeed = 2,
      scrollEase = 0.05,
    }: {
      items?: MediaItem[];
      bend?: number;
      textColor?: string;
      borderRadius?: number;
      font?: string;
      scrollSpeed?: number;
      scrollEase?: number;
    } = {}
  ) {
    document.documentElement.classList.remove("no-js");
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0, position: 0 };
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      depth: false,
      powerPreference: "high-performance"
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
    
    // Ensure canvas is visible and properly sized
    this.gl.canvas.style.width = "100%";
    this.gl.canvas.style.height = "100%";
    this.gl.canvas.style.display = "block";
  }

  createCamera() {
    this.camera = new Camera(this.renderer.gl, {
      near: 0.1,
      far: 100,
      fov: 45,
    });
    // Adjust camera position to remove top padding
    this.camera.position.z = 4.5; // Move camera slightly closer
    this.camera.position.y = -1.3; // Move camera down slightly to remove top padding
  }

  createScene() {
    this.scene = new Transform();
    // Move the entire scene down slightly to remove top padding
    this.scene.position.y = -0.1;
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.renderer.gl, {
      heightSegments: 1,
      widthSegments: 1,
    });
  }

  createMedias(
    items: MediaItem[] = [],
    bend = 1,
    textColor: string,
    borderRadius: number,
    font: string
  ) {
    const defaultItems = [
      { 
        image: "/images/one.png", 
        text: "Dr. Chancellor Name", 
        role: "Chancellor - DSU" 
      },
      { 
        image: "/images/two.png", 
        text: "Dr. Vice Chancellor", 
        role: "Vice Chancellor - DSU" 
      },
      { 
        image: "/images/three.png", 
        text: "Dr. Chief Patron", 
        role: "Chief Patron - DSU" 
      },
      { 
        image: "/images/four.png", 
        text: "Dr. Another Patron", 
        role: "Chief Patron - DSU" 
      },
      { 
        image: "/images/five.png", 
        text: "Dr. Another Patron", 
        role: "Chief Patron - DSU" 
      },
      { 
        image: "/images/six.png", 
        text: "Dr. Another Patron", 
        role: "Chief Patron - DSU" 
      },
      { 
        image: "/images/seven.png", 
        text: "Dr. Another Patron", 
        role: "Chief Patron - DSU" 
      },
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = [...galleryItems, ...galleryItems];
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        role: data.role,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font,
      });
    });
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e: WheelEvent) {
    const delta = e.deltaY || (e as any).wheelDelta || (e as any).detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener("resize", this.boundOnResize);
    window.addEventListener("mousewheel", this.boundOnWheel);
    window.addEventListener("wheel", this.boundOnWheel);
    window.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    window.addEventListener("touchstart", this.boundOnTouchDown);
    window.addEventListener("touchmove", this.boundOnTouchMove);
    window.addEventListener("touchend", this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.boundOnResize);
    window.removeEventListener("mousewheel", this.boundOnWheel);
    window.removeEventListener("wheel", this.boundOnWheel);
    window.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    window.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

interface CircularGalleryProps {
  items?: Array<{ image: string; text: string; role: string }>;
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px Figtree",
  scrollSpeed = 2,
  scrollEase = 0.05,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Ensure container has proper dimensions
    containerRef.current.style.width = "100%";
    containerRef.current.style.height = "100vh";
    containerRef.current.style.position = "relative";
    containerRef.current.style.overflow = "hidden";

    const app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
    });

    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  return (
    <div
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    />
  );
}