export default function StatisticsSection() {
  const stats = [
    { label: "Monthly Users", value: "50K+", color: "text-sky-500" },
    { label: "Money Saved", value: "$2M+", color: "text-green-500" },
    { label: "Airlines Covered", value: "150+", color: "text-amber-500" },
    { label: "User Rating", value: "4.9★", color: "text-purple-500" }
  ];

  return (
    <section className="bg-white rounded-3xl shadow-xl p-8 mb-16 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Travelers Worldwide</h3>
        <p className="text-gray-600">Join thousands of smart travelers who save time and money with FlightTools</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
