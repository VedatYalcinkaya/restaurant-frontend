import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getJobById, selectCurrentJob } from '../store/slices/jobSlice';
import { applyForJob, applyForJobWithResume, clearApplyState, selectJobApplicationApplying, selectJobApplicationApplyError, selectJobApplicationApplySuccess } from '../store/slices/jobApplicationSlice';
import { toast } from 'react-hot-toast';

const JobDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const job = useSelector(selectCurrentJob);
  const applying = useSelector(selectJobApplicationApplying);
  const applyError = useSelector(selectJobApplicationApplyError);
  const applySuccess = useSelector(selectJobApplicationApplySuccess);

  const [form, setForm] = useState({
    applicantName: '',
    email: '',
    phone: '',
    coverLetter: '',
    gdprConsent: false,
    resumeFile: null,
  });

  useEffect(() => { dispatch(getJobById(id)); }, [dispatch, id]);

  useEffect(() => {
    if (applySuccess) {
      toast.success('Başvurunuz alındı');
      setForm({ applicantName: '', email: '', phone: '', coverLetter: '', gdprConsent: false, resumeFile: null });
      dispatch(clearApplyState());
    }
    if (applyError) {
      toast.error(typeof applyError === 'string' ? applyError : 'Başvuru gönderilemedi');
      dispatch(clearApplyState());
    }
  }, [applySuccess, applyError, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.gdprConsent) {
      toast.error('KVKK onayını işaretlemelisiniz');
      return;
    }
    const applicationData = {
      positionId: Number(id),
      applicantName: form.applicantName.trim(),
      email: form.email.trim(),
      phone: form.phone?.trim() || undefined,
      coverLetter: form.coverLetter?.trim() || undefined,
      gdprConsent: true,
    };
    try {
      if (form.resumeFile) {
        await dispatch(applyForJobWithResume({ applicationData, resumeFile: form.resumeFile })).unwrap();
      } else {
        await dispatch(applyForJob(applicationData)).unwrap();
      }
    } catch (err) {
      // toast state effectte
    }
  };

  return (
    <div className="min-h-screen bg-acik-krem py-12">
      <div className="max-w-4xl mx-auto px-4">
        {job ? (
          <div className="bg-white rounded-xl shadow p-6">
            <h1 className="text-3xl font-bold text-koyu-kahve mb-2">{job.title}</h1>
            <div className="text-gray-600 mb-4">{job.department} • {job.location} • {job.employmentType}</div>
            <div className="prose max-w-none mb-6 whitespace-pre-line">
              {job.description}
            </div>
            {job.requirements && (
              <div className="mb-4 whitespace-pre-line">
                <h3 className="font-semibold text-koyu-kahve">Aranan Nitelikler</h3>
                <p className="text-gray-700">{job.requirements}</p>
              </div>
            )}
            {job.benefits && (
              <div className="mb-6 whitespace-pre-line">
                <h3 className="font-semibold text-koyu-kahve">Yan Haklar</h3>
                <p className="text-gray-700">{job.benefits}</p>
              </div>
            )}

            <h2 className="text-2xl font-bold text-koyu-kahve mb-4">Başvuru Formu</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Ad Soyad</label>
                  <input className="w-full border rounded px-3 py-2" value={form.applicantName} onChange={(e)=>setForm({...form, applicantName:e.target.value})} required minLength={2} maxLength={120} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">E-posta</label>
                  <input type="email" className="w-full border rounded px-3 py-2" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Telefon (opsiyonel)</label>
                  <input className="w-full border rounded px-3 py-2" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} maxLength={25} />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">CV (PDF/DOC/DOCX - max 20MB)</label>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e)=>setForm({...form, resumeFile:e.target.files?.[0] || null})} className="w-full" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Ön yazı (opsiyonel)</label>
                <textarea className="w-full border rounded px-3 py-2" rows={4} value={form.coverLetter} onChange={(e)=>setForm({...form, coverLetter:e.target.value})} maxLength={2000} />
              </div>
              <label className="inline-flex items-center">
                <input type="checkbox" checked={form.gdprConsent} onChange={(e)=>setForm({...form, gdprConsent:e.target.checked})} className="mr-2" />
                KVKK Aydınlatma metnini okudum ve onaylıyorum
              </label>
              <div>
                <button type="submit" disabled={applying} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded">
                  {applying ? 'Gönderiliyor...' : 'Başvur'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center text-gray-600">Yükleniyor...</div>
        )}
      </div>
    </div>
  );
};

export default JobDetailPage;


