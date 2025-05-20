import React from 'react';
import './Timeline.css';

const Timeline = () => {
  const timelineData = [
    {
      id: '01',
      title: 'Road to Sui Overflow 2025',
      details: [
        { label: 'Registration opens', value: 'February 12' }
      ]
    },
    {
      id: '02',
      title: 'Hackathon',
      details: [
        { label: 'Project submission', value: 'April 1-mid May' },
        { label: 'Demo days', value: 'May 23 & 24' },
        { label: 'Final winners announced', value: 'End of May' }
      ]
    },
    {
      id: '03',
      title: 'Exclusive Activations',
      details: [
        { label: 'Period', value: 'June-August' }
      ]
    }
  ];

  return (
    <section className="timeline-section">
      <div className="timeline-grid"></div>
      <div className="timeline-container">
        {timelineData.map((item) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-number">{item.id}</div>
            <div className="timeline-content">
              <div className="timeline-arrow"></div>
              <h3 className="timeline-title">{item.title}</h3>
              <div className="timeline-details">
                {item.details.map((detail, index) => (
                  <div key={index} className="timeline-detail">
                    <span>{detail.label}</span>
                    <span>{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;