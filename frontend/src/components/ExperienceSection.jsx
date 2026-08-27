'use client';

export default function ExperienceSection({ experience = [] }) {
  const displayEntries = experience.length > 0 ? experience : [
    {
      _id: '1',
      title: "Bachelor of Technology (B.Tech) - Computer Science Engineering",
      organization: "Lakshmi Narain College of Technology (LNCT)",
      description: "Coursework: Object Oriented Programming (OOP), Data Structures & Algorithms, Database Management System (DBMS), Computer Networks, and Operating Systems.",
      startDate: "2023",
      endDate: "Present",
      type: "education",
      location: "Bhopal, Madhya Pradesh, India"
    },
    {
      _id: '2',
      title: "Diploma in Computer Science Engineering",
      organization: "Patel College of Science & Technology (PCST)",
      description: "Foundational computer science studies, C programming, web technologies (HTML/CSS), computer hardware, and operating systems.",
      startDate: "2020",
      endDate: "2023",
      type: "education",
      location: "Bhopal, Madhya Pradesh, India"
    },
    {
      _id: '3',
      title: "Class 10th (Secondary Education)",
      organization: "Holy Garden Model Public School",
      description: "Secondary education coursework in Science, Mathematics, English, and Social Sciences.",
      startDate: "2017",
      endDate: "2018",
      type: "education",
      location: "West Bengal, India"
    }
  ];

  return (
    <section id="experience" className="py-24 relative bg-slate-50/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold tracking-wide uppercase">
            <i className="ri-graduation-cap-line text-sm"></i>
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Education & <span className="gradient-text">Degrees</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A chronological timeline of computer science degrees from LNCT & PCST Bhopal.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative pl-6 sm:pl-8 border-l-2 border-indigo-200 space-y-12">
          {displayEntries.map((item, idx) => (
            <div key={item._id || idx} className="relative group">
              {/* Timeline Dot Icon */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-10 h-10 rounded-2xl bg-white border-2 border-indigo-600 flex items-center justify-center text-indigo-600 shadow-md group-hover:scale-110 transition-transform">
                <i className="ri-graduation-cap-fill text-lg"></i>
              </div>

              {/* Card Container */}
              <div className="pro-card pro-card-hover p-6 sm:p-8 rounded-3xl bg-white space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Computer Science Engineering
                  </span>

                  <span className="text-xs font-bold text-slate-500 flex items-center space-x-1">
                    <i className="ri-calendar-event-line"></i>
                    <span>
                      {typeof item.startDate === 'string' && item.startDate.includes('-')
                        ? new Date(item.startDate).getFullYear()
                        : item.startDate}{' '}
                      -{' '}
                      {item.current
                        ? 'Present'
                        : typeof item.endDate === 'string' && item.endDate.includes('-')
                        ? new Date(item.endDate).getFullYear()
                        : item.endDate || '2023'}
                    </span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm font-bold text-indigo-600 mt-0.5">
                    {item.organization}
                  </p>
                  {item.location && (
                    <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                      <i className="ri-map-pin-line"></i>
                      <span>{item.location}</span>
                    </p>
                  )}
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
