import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listActiveJobs, selectActiveJobs } from '../store/slices/jobSlice';

const badgeMap = {
  FULL_TIME: 'Tam Zamanlı',
  PART_TIME: 'Yarı Zamanlı',
  INTERNSHIP: 'Staj',
  CONTRACT: 'Sözleşmeli',
};

const CareerPage = () => {
  const dispatch = useDispatch();
  const jobsState = useSelector(selectActiveJobs);
  const jobs = jobsState.content || [];

  useEffect(() => { dispatch(listActiveJobs()); }, [dispatch]);

  return (
    <div className="min-h-screen bg-acik-krem py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-koyu-kahve mb-8">Açık Pozisyonlar</h1>
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((j) => (
            <Link to={`/careers/${j.id}`} key={j.id} className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold text-koyu-kahve">{j.title}</div>
                  <div className="text-gray-600 text-sm">{j.department} • {j.location}</div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">{badgeMap[j.employmentType] || j.employmentType}</span>
              </div>
            </Link>
          ))}
          {jobs.length === 0 && !jobsState.loading && (
            <div className="text-center text-gray-600">Şu an açık pozisyon bulunmuyor.</div>
          )}
          {jobsState.loading && (
            <div className="text-center text-gray-600">Yükleniyor...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPage;


