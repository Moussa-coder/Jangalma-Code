import { TrendingUp } from "lucide-react";

const stats: Array<{
  label: string;
  value: string;
  trend: string;
}> = [];

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary-dark to-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Notre Impact
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Une communauté en pleine croissance qui transforme l'éducation numérique au Sénégal
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/90 font-medium mb-2">{stat.label}</div>
              <div className="inline-flex items-center gap-1 text-sm text-white/80">
                <TrendingUp className="h-4 w-4" />
                <span>{stat.trend} ce mois</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
