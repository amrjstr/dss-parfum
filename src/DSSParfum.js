import React, { useState } from "react";

function DSSParfum() {
  const [gender, setGender] = useState("");
  const [aroma, setAroma] = useState("");
  const [budget, setBudget] = useState(0);
  const [result, setResult] = useState([]);

  const dataParfum = [
    { nama: "Lavender", gender: "Wanita", aroma: "Floral", harga: 150000 },
    { nama: "Oud Kiswah", gender: "Pria", aroma: "Woody", harga: 300000 },
    { nama: "Misk Turki", gender: "Unisex", aroma: "Sweet", harga: 250000 },
  ];

  const handleCari = () => {
    const filter = dataParfum.filter(
      (p) =>
        (gender === "" || p.gender === gender) &&
        (aroma === "" || p.aroma === aroma) &&
        (budget === 0 || p.harga <= budget)
    );
    setResult(filter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Rekomendasi Parfum ✨
        </h1>

        {/* Form Input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            className="p-3 border rounded-lg"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Pilih Gender</option>
            <option value="Pria">Pria</option>
            <option value="Wanita">Wanita</option>
            <option value="Unisex">Unisex</option>
          </select>

          <select
            className="p-3 border rounded-lg"
            value={aroma}
            onChange={(e) => setAroma(e.target.value)}
          >
            <option value="">Pilih Aroma</option>
            <option value="Floral">Floral</option>
            <option value="Woody">Woody</option>
            <option value="Sweet">Sweet</option>
          </select>

          <input
            type="number"
            placeholder="Budget (Rp)"
            className="p-3 border rounded-lg"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>

        <button
          onClick={handleCari}
          className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Cari
        </button>

        {/* Hasil */}
        {result.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">
              Hasil Rekomendasi:
            </h2>
            <h1 className="text-4xl font-bold text-red-500">Hello Tailwind!</h1>
            <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Gender</th>
                  <th className="p-3">Aroma</th>
                  <th className="p-3">Harga</th>
                </tr>
              </thead>
              <tbody>
                {result.map((p, i) => (
                  <tr
                    key={i}
                    className="odd:bg-gray-100 even:bg-gray-50 text-center"
                  >
                    <td className="p-3">{p.nama}</td>
                    <td className="p-3">{p.gender}</td>
                    <td className="p-3">{p.aroma}</td>
                    <td className="p-3">Rp {p.harga.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DSSParfum;
