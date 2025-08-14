import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listActiveJobs, selectActiveJobs } from '../store/slices/jobSlice';

const badgeMap = {
  FULL_TIME: 'Vollzeit',
  PART_TIME: 'Teilzeit',
  INTERNSHIP: 'Praktikum',
  CONTRACT: 'Befristet',
};

const CareerPage = () => {
  const dispatch = useDispatch();
  const jobsState = useSelector(selectActiveJobs);
  const jobs = jobsState.content || [];

  useEffect(() => { dispatch(listActiveJobs()); }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-acik-krem/50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-koyu-kahve mb-4">Karriere bei MiPueblo</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Werde Teil unseres Teams. Hier findest du unsere aktuellen Stellenangebote.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((j) => (
            <Link to={`/careers/${j.id}`} key={j.id} className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold text-koyu-kahve group-hover:text-koyu-kirmizi transition">{j.title}</div>
                  <div className="text-gray-600 text-sm mt-1">{j.department} • {j.location}</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">{badgeMap[j.employmentType] || j.employmentType}</span>
              </div>
              <div className="bg-acik-krem/40 px-6 py-3 text-sm text-koyu-kahve flex items-center justify-between">
                <span>Mehr erfahren</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

        {jobs.length === 0 && !jobsState.loading && (
          <div className="text-center text-gray-600 mt-10">Zurzeit keine offenen Stellen.</div>
        )}
        {jobsState.loading && (
          <div className="text-center text-gray-600 mt-10">Wird geladen...</div>
        )}
      </div>
    </div>
  );
};

export default CareerPage;


