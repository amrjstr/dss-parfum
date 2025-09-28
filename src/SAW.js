import React, { useState } from "react";

const SAW = () => {
  // Data dummy parfum
  const dataParfum = [
    { id: 1, nama: "Al Khanjar", gender: "Pria", usia: 25, aktivitas: "Formal", aroma: "Woody", harga: 300000 },
    { id: 2, nama: "Lavender", gender: "Wanita", usia: 20, aktivitas: "Casual", aroma: "Floral", harga: 150000 },
    { id: 3, nama: "Oud Kiswah", gender: "Unisex", usia: 30, aktivitas: "Formal", aroma: "Oriental", harga: 500000 },
    { id: 4, nama: "Misk Turki", gender: "Pria", usia: 27, aktivitas: "Casual", aroma: "Fresh", harga: 250000 },
  ];

  // State preferensi user
  const [pref, setPref] = useState({
    gender: "Pria",
    usia: 25,
    aktivitas: "Formal",
    aroma: "Woody",
    budget: 300000,
  });

  const [hasil, setHasil] = useState([]);

  // Bobot kriteria
  const bobot = {
    gender: 0.2,
    usia: 0.2,
    aktivitas: 0.2,
    aroma: 0.2,
    harga: 0.2,
  };

  // Normalisasi berdasarkan preferensi user
  const normalisasi = (data) => {
    const maxUsia = Math.max(...data.map((d) => d.usia));
    const maxHarga = Math.max(...data.map((d) => d.harga));

    return data.map((d) => ({
      ...d,
      nUsia: 1 - Math.abs(pref.usia - d.usia) / maxUsia, // makin dekat makin bagus
      nHarga: 1 - Math.abs(pref.budget - d.harga) / maxHarga, // makin dekat ke budget makin bagus
      nGender: d.gender === pref.gender ? 1 : 0.7,
      nAktivitas: d.aktivitas === pref.aktivitas ? 1 : 0.7,
      nAroma: d.aroma === pref.aroma ? 1 : 0.7,
    }));
  };

  const hitungSAW = () => {
    const normal = normalisasi(dataParfum);

    const result = normal
      .map((d) => ({
        ...d,
        score:
          d.nGender * bobot.gender +
          d.nUsia * bobot.usia +
          d.nAktivitas * bobot.aktivitas +
          d.nAroma * bobot.aroma +
          d.nHarga * bobot.harga,
      }))
      .sort((a, b) => b.score - a.score);

    setHasil(result);
  };

  // Format currency
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  // Get badge color based on ranking
  const getRankingColor = (rank) => {
    switch(rank) {
      case 0: return 'bg-yellow-400 text-yellow-900';
      case 1: return 'bg-gray-300 text-gray-700';
      case 2: return 'bg-amber-600 text-white';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Sistem Rekomendasi Parfum</h1>
          <p className="text-purple-100">Temukan parfum terbaik dengan metode SAW (Simple Additive Weighting)</p>
        </div>

        {/* Form Preferensi */}
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              Preferensi Pengguna
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  value={pref.gender}
                  onChange={(e) => setPref({ ...pref, gender: e.target.value })}
                >
                  <option>Pria</option>
                  <option>Wanita</option>
                  <option>Unisex</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Usia</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={pref.usia}
                  onChange={(e) => setPref({ ...pref, usia: Number(e.target.value) })}
                  min="1"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Aktivitas</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  value={pref.aktivitas}
                  onChange={(e) => setPref({ ...pref, aktivitas: e.target.value })}
                >
                  <option>Formal</option>
                  <option>Casual</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Aroma</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  value={pref.aroma}
                  onChange={(e) => setPref({ ...pref, aroma: e.target.value })}
                >
                  <option>Woody</option>
                  <option>Floral</option>
                  <option>Oriental</option>
                  <option>Fresh</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Budget</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">Rp</span>
                  <input
                    type="number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={pref.budget}
                    onChange={(e) => setPref({ ...pref, budget: Number(e.target.value) })}
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tombol Hitung */}
          <div className="flex justify-center">
            <button
              onClick={hitungSAW}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Cari Rekomendasi Parfum</span>
            </button>
          </div>

          {/* Hasil Rekomendasi */}
          {hasil.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-green-100 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </span>
                Hasil Rekomendasi
              </h2>
              
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-50 text-gray-600 font-semibold text-sm">
                  <div className="col-span-1 p-4 text-center">Ranking</div>
                  <div className="col-span-4 p-4">Nama Parfum</div>
                  <div className="col-span-3 p-4">Detail</div>
                  <div className="col-span-2 p-4 text-center">Kecocokan</div>
                  <div className="col-span-2 p-4 text-right">Harga</div>
                </div>
                
                {hasil.map((d, i) => (
                  <div key={d.id} className="grid grid-cols-12 border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <div className="col-span-1 p-4 flex items-center justify-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRankingColor(i)}`}>
                        #{i + 1}
                      </span>
                    </div>
                    <div className="col-span-4 p-4">
                      <div className="font-semibold text-gray-800">{d.nama}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{d.gender}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">{d.aktivitas}</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">{d.aroma}</span>
                      </div>
                    </div>
                    <div className="col-span-3 p-4 text-sm text-gray-600">
                      <div>Usia: {d.usia} tahun</div>
                    </div>
                    <div className="col-span-2 p-4 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{d.score.toFixed(3)}</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${d.score * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 p-4 text-right">
                      <div className="font-semibold text-gray-800">{formatRupiah(d.harga)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-gray-500 text-sm">
          Sistem Rekomendasi Parfum menggunakan metode SAW
        </div>
      </div>
    </div>
  );
};

export default SAW;