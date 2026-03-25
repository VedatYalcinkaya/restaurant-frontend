import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listActiveJobs, selectActiveJobs } from "../store/slices/jobSlice";

const badgeMap = {
  FULL_TIME: "Tam Zamanlı",
  PART_TIME: "Yarı Zamanlı",
  INTERNSHIP: "Staj",
  CONTRACT: "Sözleşmeli",
};

const CareerPage = () => {
  const dispatch = useDispatch();
  const jobsState = useSelector(selectActiveJobs);
  const jobs = jobsState.content || [];

  useEffect(() => {
    dispatch(listActiveJobs());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-canvas/50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
            Ala Söğüş&apos;te Kariyer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ekibimize katılmak istiyorsanız açık pozisyonları buradan
            inceleyebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Link
              to={`/careers/${job.id}`}
              key={job.id}
              className="group bg-white rounded-xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-xl font-semibold text-ink group-hover:text-brand-red transition">
                    {job.title}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    {job.department} - {job.location}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs bg-brand-red/10 text-brand-red-deep">
                  {badgeMap[job.employmentType] || job.employmentType}
                </span>
              </div>
              <div className="bg-canvas/40 px-6 py-3 text-sm text-ink flex items-center justify-between">
                <span>Detayları Gör</span>
                <span>&gt;</span>
              </div>
            </Link>
          ))}
        </div>

        {jobs.length === 0 && !jobsState.loading && (
          <div className="text-center text-gray-600 mt-10">
            Şu anda açık pozisyon bulunmuyor.
          </div>
        )}

        {jobsState.loading && (
          <div className="text-center text-gray-600 mt-10">İlanlar yükleniyor...</div>
        )}
      </div>
    </div>
  );
};

export default CareerPage;
