import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createJob, updateJob, getJobById, selectCurrentJob } from '../../store/slices/jobSlice';
import { toast } from 'react-hot-toast';

const AdminJobForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const current = useSelector(selectCurrentJob);

  const [form, setForm] = useState({
    title: '',
    department: '',
    location: '',
    employmentType: 'FULL_TIME',
    description: '',
    requirements: '',
    benefits: '',
    displayOrder: 0,
    active: true,
  });

  useEffect(() => { if (isEdit) dispatch(getJobById(id)); }, [dispatch, isEdit, id]);
  useEffect(() => {
    if (isEdit && current) {
      setForm({
        title: current.title || '',
        department: current.department || '',
        location: current.location || '',
        employmentType: current.employmentType || 'FULL_TIME',
        description: current.description || '',
        requirements: current.requirements || '',
        benefits: current.benefits || '',
        displayOrder: current.displayOrder ?? 0,
        active: current.active ?? true,
      });
    }
  }, [isEdit, current]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title.trim(),
        department: form.department?.trim() || undefined,
        location: form.location?.trim() || undefined,
        employmentType: form.employmentType,
        description: form.description?.trim() || undefined,
        requirements: form.requirements?.trim() || undefined,
        benefits: form.benefits?.trim() || undefined,
        displayOrder: Number(form.displayOrder) || 0,
        active: Boolean(form.active),
      };
      if (isEdit) {
        await dispatch(updateJob({ id, payload })).unwrap();
        toast.success('İlan güncellendi');
      } else {
        await dispatch(createJob(payload)).unwrap();
        toast.success('İlan oluşturuldu');
      }
      navigate('/admin/jobs');
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || 'İşlem başarısız');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">{isEdit ? 'İlanı Düzenle' : 'Yeni İlan'}</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Başlık</label>
            <input name="title" value={form.title} onChange={handleChange} required minLength={2} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Bölüm</label>
              <input name="department" value={form.department} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Lokasyon</label>
              <input name="location" value={form.location} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Çalışma Türü</label>
            <select name="employmentType" value={form.employmentType} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white">
              <option value="FULL_TIME">Tam Zamanlı</option>
              <option value="PART_TIME">Yarı Zamanlı</option>
              <option value="INTERNSHIP">Staj</option>
              <option value="CONTRACT">Sözleşmeli</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Açıklama</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={5} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Nitelikler</label>
            <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={4} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Yan Haklar</label>
            <textarea name="benefits" value={form.benefits} onChange={handleChange} rows={3} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Sıra</label>
              <input type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white" />
            </div>
            <div className="flex items-end">
              <label className="inline-flex items-center text-gray-300">
                <input type="checkbox" name="active" checked={form.active} onChange={handleChange} className="mr-2" />
                Aktif
              </label>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">{isEdit ? 'Güncelle' : 'Oluştur'}</button>
        </div>
      </form>
    </div>
  );
};

export default AdminJobForm;


