import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { 
  IconChefHat,
  IconCategory,
  IconCalendarTime,
  IconSparkles,
  IconArrowRight
} from '@tabler/icons-react';
import { listMenusPaginated, listAllMenus } from '../store/slices/menuSlice';
import { listMenuCategoriesPaginated, listAllMenuCategories } from '../store/slices/menuCategorySlice';
import { listReservations } from '../store/slices/reservationSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const menuState = useSelector((state) => state.menus.paginated);
  const menuListState = useSelector((state) => state.menus.list);
  const categoryState = useSelector((state) => state.menuCategories.paginated);
  const categoryListState = useSelector((state) => state.menuCategories.list);
  const reservationState = useSelector((state) => state.reservations.list);
  
  const [stats, setStats] = useState({
    totalMenus: 0,
    totalCategories: 0,
    totalReservations: 0,
    recentMenus: [],
    recentCategories: [],
    recentReservations: [],
  });

  useEffect(() => {
    dispatch(listMenusPaginated({ page: 0, size: 5 }));
    dispatch(listAllMenus());
    dispatch(listMenuCategoriesPaginated({ page: 0, size: 5 }));
    dispatch(listAllMenuCategories());
    dispatch(listReservations({ page: 0, size: 5 }));
  }, [dispatch]);

  useEffect(() => {
    const menusContent = (menuState.content && menuState.content.length > 0)
      ? menuState.content
      : (menuListState.content || []);
    const categoriesContent = (categoryState.content && categoryState.content.length > 0)
      ? categoryState.content
      : (categoryListState.content || []);

    setStats({
      totalMenus: Number(menuState.totalElements) || menusContent.length || 0,
      totalCategories: Number(categoryState.totalElements) || categoriesContent.length || 0,
      totalReservations: Number(reservationState.totalElements) || (reservationState.content || []).length || 0,
      recentMenus: menusContent.slice(0, 3),
      recentCategories: categoriesContent.slice(0, 3),
      recentReservations: (reservationState.content || []).slice(0, 3),
    });
  }, [menuState, menuListState, categoryState, categoryListState, reservationState]);

  const isLoading = menuState.loading || categoryState.loading || reservationState.loading;
  const statCards = [
    {
      title: 'Menüler',
      value: stats.totalMenus || 0,
      accent: 'emerald',
      link: '/admin/menus',
      actionLabel: 'Menüleri Yönet',
      icon: <IconChefHat className="mr-2 text-emerald-400" />,
      recent: stats.recentMenus || [],
      renderRecent: (item) => (
        <>
          <span className="truncate mr-2">{item.name}</span>
          <span className="text-emerald-400">#{item.id}</span>
        </>
      ),
    },
    {
      title: 'Kategoriler',
      value: stats.totalCategories || 0,
      accent: 'blue',
      link: '/admin/categories',
      actionLabel: 'Kategorileri Yönet',
      icon: <IconCategory className="mr-2 text-sky-400" />,
      recent: stats.recentCategories || [],
      renderRecent: (item) => (
        <>
          <span className="truncate mr-2">{item.name}</span>
          <span className="text-sky-400">#{item.id}</span>
        </>
      ),
    },
    {
      title: 'Rezervasyonlar',
      value: stats.totalReservations || 0,
      accent: 'violet',
      link: '/admin/reservations',
      actionLabel: 'Rezervasyonları Yönet',
      icon: <IconCalendarTime className="mr-2 text-violet-400" />,
      recent: stats.recentReservations || [],
      renderRecent: (item) => (
        <>
          <span className="truncate mr-2">{item.customerName} {item.customerSurname}</span>
          <span className="text-violet-400">{item.reservationDate} {item.reservationTime}</span>
        </>
      ),
    },
  ];
  
  return (
    <div>
      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8 rounded-[28px] border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-900/70 to-emerald-950/60 p-6 md:p-8 shadow-2xl"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-emerald-200">
              <IconSparkles size={14} />
              Yönetim Özeti
            </div>
            <h1 className="text-3xl font-semibold text-white md:text-4xl">Kontrol Merkezi</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Ala Söğüş yönetim alanında menü, kategori ve rezervasyon akışlarını tek bakışta takip edin.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Toplam Menü</div>
              <div className="mt-2 text-2xl font-semibold text-white">{stats.totalMenus || 0}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Kategori</div>
              <div className="mt-2 text-2xl font-semibold text-white">{stats.totalCategories || 0}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 col-span-2 sm:col-span-1">
              <div className="text-xs uppercase tracking-[0.22em] text-slate-400">Rezervasyon</div>
              <div className="mt-2 text-2xl font-semibold text-white">{stats.totalReservations || 0}</div>
            </div>
          </div>
        </div>
      </Motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.07 }}
            className="rounded-[26px] border border-white/10 bg-slate-900/70 p-6 shadow-xl backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center text-white">
                {card.icon}
                {card.title}
              </h2>
              <Link
                to={card.link}
                className="inline-flex items-center gap-1 rounded-full bg-white/8 px-3 py-1.5 text-sm text-slate-200 transition hover:bg-white/12"
              >
                Yönet
                <IconArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4 text-center">
                <p className="text-3xl font-bold text-white">{card.value}</p>
                <p className="mt-1 text-xs text-slate-400">Toplam kayıt</p>
              </div>
              <div className="col-span-2 rounded-2xl border border-white/8 bg-black/20 p-4">
                <p className="text-sm text-slate-400">Son eklenenler</p>
                <div className="mt-3 space-y-2">
                  {card.recent.length > 0 ? card.recent.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm text-slate-300">
                      {card.renderRecent(item)}
                    </div>
                  )) : (
                    <div className="text-sm text-slate-500">Henüz kayıt yok</div>
                  )}
                </div>
              </div>
            </div>
          </Motion.div>
        ))}
      </div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="bg-slate-900/70 rounded-[26px] p-6 shadow-xl mb-8 border border-white/10 backdrop-blur-xl"
      >
        <h2 className="text-xl font-semibold mb-4">Hızlı Erişim</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/admin/menus/new" className="group bg-gradient-to-br from-emerald-700 to-emerald-950 hover:from-emerald-600 hover:to-emerald-800 text-white p-5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1">
            <IconChefHat className="h-8 w-8 mb-2" />
            <span>Yeni Menü</span>
            <span className="mt-1 text-xs text-emerald-100/80">Ürün kartı oluştur</span>
          </Link>
          <Link to="/admin/categories/new" className="group bg-gradient-to-br from-sky-700 to-sky-950 hover:from-sky-600 hover:to-sky-800 text-white p-5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1">
            <IconCategory className="h-8 w-8 mb-2" />
            <span>Yeni Kategori</span>
            <span className="mt-1 text-xs text-sky-100/80">Menüyü düzenli tut</span>
          </Link>
          <Link to="/admin/reservations" className="group bg-gradient-to-br from-violet-700 to-violet-950 hover:from-violet-600 hover:to-violet-800 text-white p-5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1">
            <IconCalendarTime className="h-8 w-8 mb-2" />
            <span>Rezervasyonlar</span>
            <span className="mt-1 text-xs text-violet-100/80">Günlük akışı takip et</span>
          </Link>
        </div>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.28 }}
        className="bg-slate-900/70 rounded-[26px] p-6 shadow-xl border border-white/10 backdrop-blur-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <IconChefHat className="mr-2 text-emerald-400" size={20} />
            Son Eklenen Menüler
          </h2>
          <Link to="/admin/menus" className="text-emerald-500 hover:text-emerald-400 text-sm">
            Tümünü Gör
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (stats.recentMenus || []).length > 0 ? (
          <div className="space-y-3">
            {(stats.recentMenus || []).map((menu) => (
              <div key={menu.id} className="bg-white/5 rounded-2xl p-4 flex items-center justify-between border border-white/8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mr-3 overflow-hidden">
                    {menu.imageUrl ? (
                      <img src={menu.imageUrl} alt={menu.name} className="w-12 h-12 object-cover" />
                    ) : (
                      <IconChefHat className="text-gray-400" size={20} />
                    )}
                  </div>
                  <div className="font-medium text-white">{menu.name}</div>
                </div>
                <div className="flex items-center">
                  <Link to={`/admin/menus/edit/${menu.id}`} className="text-emerald-400 hover:text-emerald-300">
                    Düzenle
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            Henüz menü eklenmemiş
          </div>
        )}
      </Motion.div>
    </div>
  );
};

export default AdminDashboard;

