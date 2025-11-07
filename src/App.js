import React, { useState, useEffect, useCallback, memo } from 'react';
import { Home, BarChartHorizontalBig, Sparkles, Music, ArrowUp, ArrowDown, TrendingUp, Layers, Send, Linkedin, Github, Twitter, Zap, Facebook, Instagram, Sun, Moon, AlertTriangle, Star, Clock, ThumbsDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie, Tooltip as RechartsTooltip } from 'recharts';

// --- IMPORTACIONES DE ESTILOS Y IMÁGENES ---
import './App.css'; // <-- Importa las variables CSS
import MusicHero from './imagenes/music.jpg';
import EarthHero from './imagenes/tierra-con-auriculares-con-efecto-brillante-sobre-fondo-negro.jpg';
import UXUIHero from './imagenes/representacion-de-la-experiencia-del-usuario-y-el-diseno-de-la-interfaz-en-el-telefono-inteligente.jpg';


// --- DATOS GLOBALES ---
const teamSocials = [
    { name: 'LinkedIn', icon: Linkedin, url: '#' }, { name: 'GitHub', icon: Github, url: '#' }, { name: 'Twitter', icon: Twitter, url: '#' }, { name: 'Facebook', icon: Facebook, url: '#' }, { name: 'Instagram', icon: Instagram, url: '#' },
];


// --- UTILITIES ---

// (getThemeClass fue eliminada ya que no se usa)

const MusicAnalyticsLogo = memo(({ isDark }) => ( 
    <div className="flex items-center gap-3 transform hover:scale-105 transition-transform duration-200 cursor-pointer h-8">
      <div className="flex items-center justify-center h-full" style={{ minWidth: '32px' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hexGradientOuter" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="var(--accent-color)" /><stop offset="1" stopColor="var(--primary-color)" /></linearGradient><linearGradient id="hexGradientInner" x1="12" y1="6.5" x2="12" y2="17.5" gradientUnits="userSpaceOnUse"><stop stopColor="var(--primary-color)" /><stop offset="1" stopColor="var(--accent-color)" /></linearGradient></defs><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="url(#hexGradientOuter)" stroke="var(--accent-color)" strokeWidth="1"/><path d="M12 6.5L6.5 9.5V14.5L12 17.5L17.5 14.5V9.5L12 6.5Z" fill="url(#hexGradientInner)" stroke="var(--primary-color)" strokeWidth="0.5"/></svg>
      </div>
      <div className={`h-full border-l border-[var(--glass-border)]`} style={{ height: '24px' }}></div>
      <div className="flex flex-col justify-center h-full">
          <span className="text-lg font-logo-text text-[var(--text-color)]">
            Music
          </span>
          <span className="text-lg font-logo-text mt-[-4px] text-[var(--text-color)]">
            Analytics
          </span>
      </div>
    </div>
));
const MetricCard = memo(({ isDark, title, value, change, icon: Icon, trend, description, metricId }) => { const isUp = trend === 'up'; const changeColorClass = isUp ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-[var(--text-muted)]'; const IconComponent = Icon; return (<div className="p-4 rounded-lg shadow-md border bg-[var(--card-bg-color)] border-[var(--glass-border)] flex flex-col"><div className="flex items-center justify-between"> <h3 className="text-sm font-body-sintony text-[var(--text-muted)] uppercase tracking-wider">{title}</h3> <IconComponent className={`w-5 h-5 text-[var(--accent-color)]`} /> </div><div className="mt-2 flex flex-col sm:flex-row sm:items-end justify-between"> <p className={`text-3xl font-title-display text-[var(--primary-color)]`}> {value} </p> <div className="flex items-center mt-1 sm:mt-0"> <span className={`text-sm font-body-sintony ${changeColorClass}`}> {change} </span> {trend !== 'neutral' && (isUp ? <ArrowUp className={`w-4 h-4 ml-1 ${changeColorClass}`} /> : <ArrowDown className={`w-4 h-4 ml-1 ${changeColorClass}`} /> )} </div> </div><p className="text-xs text-[var(--text-muted)] mt-1 font-body-sintony flex-grow">{description}</p></div>); });
const ChartContainer = memo(({ isDark, title, children, className = '', onBarClick }) => { return ( <div className={`relative p-4 rounded-lg shadow-md border col-span-1 bg-[var(--card-bg-color)] border-[var(--glass-border)] transition-all duration-300 ${className}`}> <h2 className={`text-lg font-title-display text-[var(--text-color)] mb-4 border-b border-[var(--glass-border)] pb-2`}>{title}</h2> <div className="h-[280px] md:h-[350px]">{children}</div> </div> ); });

const HomeCarousel = memo(({ isDark, setActiveTab }) => { 
    const placeholderUrl = (width, height, text) => {
        const bgColor = isDark ? '1c2541' : 'e5e7eb';
        const textColor = isDark ? 'a0aec0' : '4b5563';
        return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
    };

    const slides = [
        { id: 'inicio', title: 'El Ritmo de los Datos Musicales', description: 'Tu viaje por la analítica musical (1920-2020) empieza aquí.', imageSrc: MusicHero, imageAlt: 'Visualización abstracta de analítica musical', buttonText: 'Explorar Datos', buttonIcon: BarChartHorizontalBig, onClick: () => setActiveTab('explorar') },
        { id: 'explorar', title: 'Popularidad y Energía por Década', description: 'Observa cómo la popularidad promedio ha subido y la energía ha fluctuado.', imageSrc: EarthHero, imageAlt: 'Gráfico de popularidad y energía', buttonText: 'Ver Gráficos', buttonIcon: TrendingUp, onClick: () => setActiveTab('explorar') },
        { id: 'hallazgos', title: 'Conclusiones y Hallazgos Clave', description: 'Descubre los "outliers", los artistas más frecuentes y las conclusiones principales.', imageSrc: UXUIHero, imageAlt: 'Visualización de hallazgos', buttonText: 'Ver Hallazgos', buttonIcon: Layers, onClick: () => setActiveTab('lab') },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const goToSlide = useCallback((index) => {
        setCurrentSlide((index + slides.length) % slides.length);
    }, [slides.length]);

    const goToNext = useCallback(() => {
        goToSlide(currentSlide + 1);
    }, [currentSlide, goToSlide]);

    useEffect(() => {
        const intervalId = setInterval(goToNext, 6000); 
        return () => clearInterval(intervalId);
    }, [goToNext]);

    const currentSlideData = slides[currentSlide];

    return (
        <div className={`relative w-full max-w-7xl mx-auto rounded-xl shadow-2xl overflow-hidden bg-[var(--card-bg-color)]`}>
            <div key={currentSlide} className="animate-fadeIn" style={{animationDuration: '0.8s'}}>
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] md:min-h-[600px]">
                    {/* Columna Izquierda: Texto */}
                    <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 text-center md:text-left order-2 md:order-1">
                        <h1 className={`text-4xl lg:text-5xl font-title-display tracking-tight text-[var(--text-color)]`}>
                            {currentSlideData.title}
                        </h1>
                        <p className={`mt-6 text-lg leading-8 text-[var(--text-muted)] font-body-sintony`}>
                            {currentSlideData.description}
                        </p>
                        <div className="mt-10 flex items-center justify-center md:justify-start gap-x-6">
                            <button
                                onClick={currentSlideData.onClick}
                                className={`rounded-md px-4 py-3 text-sm font-semibold shadow-sm focus:visible:outline focus:visible:outline-2 focus:visible:outline-offset-2 flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500`}
                            >
                                {React.createElement(currentSlideData.buttonIcon, {className: "w-5 h-5"})}
                                {currentSlideData.buttonText}
                            </button>
                        </div>
                    </div>
                    {/* Columna Derecha: Imagen */}
                    <div className="order-1 md:order-2">
                        <img
                            src={currentSlideData.imageSrc} 
                            alt={currentSlideData.imageAlt}
                            className="w-full h-64 md:h-full object-cover md:min-h-[600px]"
                            onError={(e) => { e.target.onerror = null; e.target.src = placeholderUrl(800, 600, 'Error de Imagen'); }}
                        />
                    </div>
                </div>
            </div>

            {/* Indicadores de Puntos */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-[var(--accent-color)] scale-125 shadow-lg' : 'bg-gray-600/50 hover:bg-gray-400'}`}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
});


// --- DATOS REALES (Con Bailabilidad simulada para el juego) ---
const dataByDecadeReal = [
    { decade: '1920-1940', avg_duration_min: 3.25, avg_energy: 0.28, avg_danceability: 0.55 },
    { decade: '1940-1960', avg_duration_min: 3.10, avg_energy: 0.45, avg_danceability: 0.58 },
    { decade: '1960-1980', avg_duration_min: 3.70, avg_energy: 0.58, avg_danceability: 0.62 },
    { decade: '1980-2000', avg_duration_min: 4.10, avg_energy: 0.68, avg_danceability: 0.65 },
    { decade: '2000-2021', avg_duration_min: 3.48, avg_energy: 0.65, avg_danceability: 0.70 },
];
const avgDurationByDecade = [
    { epoca: '1ra (1921-40)', dur_min: 3.25, dur_seg: 15 },
    { epoca: '2da (1941-60)', dur_min: 3.10, dur_seg: 6 },
    { epoca: '3ra (1961-80)', dur_min: 3.70, dur_seg: 56 },
    { epoca: '4ta (1981-00)', dur_min: 4.10, dur_seg: 3 },
    { epoca: '5ta (2001-21)', dur_min: 3.48, dur_seg: 48 },
];
const loudnessByYearReal = [
    { year: 1925, avg_loudness: -19.5 }, { year: 1935, avg_loudness: -18.0 }, { year: 1945, avg_loudness: -16.8 },
    { year: 1955, avg_loudness: -14.5 }, { year: 1965, avg_loudness: -12.5 }, { year: 1975, avg_loudness: -11.0 },
    { year: 1985, avg_loudness: -9.5 },  { year: 1995, avg_loudness: -7.5 },  { year: 2005, avg_loudness: -6.0 },
    { year: 2015, avg_loudness: -6.5 },  { year: 2020, avg_loudness: -6.8 },
];
const explicitCountsReal = { 'No Explícita': 169006, 'Explícita': 12051 };
const totalSongs = explicitCountsReal['No Explícita'] + explicitCountsReal['Explícita'];
const explicitPercentage = (explicitCountsReal['Explícita'] / totalSongs) * 100;
const keyDistributionReal = [
    { key: 'C', count: 20438, color: '#E0E0FF' }, { key: 'G', count: 18151, color: '#5C94FF' },
    { key: 'D', count: 17294, color: '#32C7FF' }, { key: 'A', count: 16982, color: '#42E6A4' },
    { key: 'E', count: 14782, color: '#22B860' }, { key: 'B', count: 14002, color: '#A85CE9' },
    { key: 'F#', count: 13994, color: '#7D3ECF' }, { key: 'F', count: 13463, color: '#FFB83C' },
    { key: 'C#', count: 12108, color: '#FF7A5C' }, { key: 'Bb', count: 10452, color: '#454564' },
    { key: 'Eb', count: 9870, color: '#1CFFD1' }, { key: 'Ab', count: 9110, color: '#A0AEC0' }
];
const topArtistsReal = [
    { name: 'Michael Jackson', count: 107, color: '#FF6B6B' }, 
    { name: 'The Beatles', count: 106, color: '#00FFFF' },
    { name: 'Queen', count: 95, color: '#0077B6' },
    { name: 'Taylor Swift', count: 92, color: '#48CA34' },
    { name: 'Led Zeppelin', count: 88, color: '#90E0EF' },
];
const outlierSongsReal = [
    { title: 'Tempo más Alto', icon: Zap, value: '244.06 BPM', name: 'Macarena', artist: 'Los del Rio', color: 'text-red-400' },
    { title: 'La Más Popular', icon: Star, value: '100 Pop.', name: 'Blinding Lights', artist: 'The Weeknd', color: 'text-yellow-400' },
    { title: 'La Más Bailable', icon: Music, value: '0.99 Bailabilidad', name: 'Where Are You Now', artist: 'Honorata Skarbek', color: 'text-blue-400' },
    { title: 'La Más Baja (Loudness)', icon: ThumbsDown, value: '-37.95 dB', name: 'Nardis', artist: 'Bill Evans', color: 'text-gray-400' },
];
const firstYear = '1921';
const lastYear = '2020';
const avgDurationAll = '3:45 min'; 
const kpiMetricsUpdated = [
  { title: 'Canciones Analizadas', value: totalSongs.toLocaleString(), change: `(${firstYear} - ${lastYear})`, icon: Music, trend: 'neutral', description: 'Total canciones del dataset.', metricId: 'total_songs' },
  { title: 'Canciones Explícitas (%)', value: `${explicitPercentage.toFixed(1)}%`, change: `Nro: ${explicitCountsReal['Explícita'].toLocaleString()}`, icon: AlertTriangle, trend: 'up', description: 'Porcentaje de canciones explícitas.', metricId: 'explicit_percent' },
  { title: 'Duración Promedio (General)', value: avgDurationAll, change: '225,333 ms', icon: Clock, trend: 'down', description: 'Duración promedio total del dataset (1921-2020).', metricId: 'avg_duration' },
  { title: 'Moda Nota Musical', value: 'C (Do)', change: `${keyDistributionReal[0].count.toLocaleString()} veces`, icon: Zap, trend: 'up', description: 'La nota musical más frecuente es C (Do).', metricId: 'mode_key' },
];

// --- COMPONENTES DE PÁGINAS (Usando Variables CSS) ---

const TopArtistsChartReal = memo(({ isDark }) => {
    return (
        <div className={`p-4 rounded-lg shadow-md border h-full bg-[var(--card-bg-color)] border-[var(--glass-border)]`}>
            <h3 className="text-lg font-title-display text-[var(--text-color)] mb-4">Top 5 Artistas (por Nro. Canciones)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topArtistsReal} layout="vertical" margin={{ top: 0, right: 10, left: 30, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                    <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" width={100} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg-color)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} />
                    <Bar dataKey="count" name="Canciones" radius={[0, 4, 4, 0]}>
                        {topArtistsReal.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
});

const OutlierCardsReal = memo(({ isDark }) => {
    return (
        <div className="space-y-4 h-full">
            <h3 className={`text-lg font-title-display text-[var(--text-color)] mb-4 px-4`}>Joyas Ocultas (Outliers)</h3>
            {outlierSongsReal.map((song) => {
                const Icon = song.icon;
                return (
                    <div key={song.title} className={`p-3 rounded-lg border flex items-center gap-4 bg-[var(--card-bg-color)] border-[var(--glass-border)]`}>
                        <Icon className={`w-8 h-8 flex-shrink-0 ${song.color}`} />
                        <div>
                            <p className={`text-sm font-body-sintony text-[var(--text-muted)]`}>{song.title}: <span className={`font-semibold ${song.color}`}>{song.value}</span></p>
                            <p className={`text-base font-semibold font-body-sintony truncate text-[var(--text-color)]`} title={`${song.name} - ${song.artist}`}>
                                {song.name} - <span className="font-normal opacity-80">{song.artist}</span>
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

const AvgDurationBarChart = memo(({ isDark }) => {
    const tooltipContentStyle = { backgroundColor: 'var(--card-bg-color)', border: '1px solid var(--accent-color)', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' };
    const tickColor = 'var(--text-muted)';

    return (
        <ChartContainer title="Duración Promedio (min) por Década (1921-2021)" isDark={isDark}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={avgDurationByDecade} margin={{ top: 10, right: 30, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                    <XAxis dataKey="epoca" tick={{ fill: tickColor, fontSize: 11 }} />
                    <YAxis label={{ value: 'Duración (Minutos)', angle: -90, position: 'insideLeft', fill: tickColor, fontSize: 12 }} tick={{ fill: tickColor }} />
                    <Tooltip contentStyle={tooltipContentStyle} formatter={(value, name, props) => [`${props.payload.dur_min.toFixed(0)} min ${props.payload.dur_seg} seg`, 'Duración Promedio']} />
                    <Bar dataKey="dur_min" name="Duración Promedio" radius={[4, 4, 0, 0]}>
                        {avgDurationByDecade.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#00FFFF', '#0077B6', '#48CA34', '#90E0EF', '#FF6B6B'][index % 5]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
});

const KeyDistributionPieChart = memo(({ isDark }) => {
    const renderCustomPieTooltipReal = ({ active, payload }) => {
        if (active && payload && payload.length) {
          const data = payload[0]?.payload;
          if (data) {
              const total = keyDistributionReal.reduce((sum, item) => sum + item.count, 0);
              const percentage = (data.count / total) * 100;
              return (
                <div className="p-2 rounded-md bg-[var(--card-bg-color)] border border-[var(--accent-color)] shadow-lg text-sm">
                  <p className="label font-semibold">{`Nota: ${data.key}`}</p>
                  <p>{`Frecuencia: ${data.count.toLocaleString()} (${percentage.toFixed(1)}%)`}</p>
                </div>
              );
          }
        }
        return null;
      };

    return (
        <ChartContainer title="Distribución de Notas Musicales (Key)" isDark={isDark}>
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
                 <Pie data={keyDistributionReal} dataKey="count" nameKey="key" cx="50%" cy="50%" outerRadius={120} innerRadius={50} label={({ key, percent }) => `${key} (${(percent * 100).toFixed(1)}%)`}>
                    {keyDistributionReal.map((entry, index) => ( <Cell key={`cell-${index}`} fill={entry.color} /> ))}
                 </Pie>
                  <RechartsTooltip content={renderCustomPieTooltipReal} />
             </PieChart>
           </ResponsiveContainer>
        </ChartContainer>
    );
});

const ExplorarDatosPage = memo(({ isDark }) => {
    const dataByDecadeForPlot = dataByDecadeReal.map(d => ({
        ...d,
        decade: d.decade.replace('-', '-\n'),
    }));

    const tooltipLineContentStyle = { backgroundColor: 'var(--card-bg-color)', border: '1px solid var(--accent-color)', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' };
    const tickColor = 'var(--text-muted)';

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 h-full overflow-y-auto custom-scrollbar">
            <h1 className="text-3xl font-title-display text-[var(--text-color)]">Explorar Datos (1921 - 2020)</h1>
            <div className={`p-3 rounded-md bg-[var(--accent-color)]/10 text-[var(--accent-color)] text-sm animate-fadeInUp flex justify-between items-center`}> <span>El Spotify Dataset 1921–2020,  es una base de datos creada por Yamac Eren Ay, que recopila información detallada sobre las características de audio de más de 160 mil canciones y los indicadores de popularidad de más de un millón de artistas. Los datos fueron obtenidos directamente de la Spotify Web API, lo que garantiza su autenticidad y actualidad.</span> </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"> {kpiMetricsUpdated.map((metric, index) => ( <MetricCard key={index} {...metric} isDark={isDark} /> ))} </div>

            {/* Fila 1 de Gráficos: Duración y Nota Musical */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <AvgDurationBarChart isDark={isDark} />
                <KeyDistributionPieChart isDark={isDark} />
            </div>

            {/* Fila 2 de Gráficos: Popularidad/Energía y Loudness */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                 <ChartContainer title="Bailabilidad y Energía Promedio (1921-2021)" isDark={isDark}>
                     <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={dataByDecadeForPlot} margin={{ top: 10, right: 30, left: 5, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                             <XAxis dataKey="decade" tick={{ fill: tickColor }} />
                             <YAxis yAxisId="left" label={{ value: 'Bailabilidad', angle: -90, position: 'insideLeft', fill: tickColor, fontSize: 12 }} domain={[0.5, 0.8]} tick={{ fill: tickColor }}/>
                             <YAxis yAxisId="right" orientation="right" domain={[0, 1]} label={{ value: 'Energía', angle: -90, position: 'insideRight', fill: tickColor, fontSize: 12 }} tick={{ fill: tickColor }} />
                             <Tooltip contentStyle={tooltipLineContentStyle} />
                             <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--text-muted)' }} />
                             <Line yAxisId="left" type="monotone" dataKey="avg_danceability" name="Bailabilidad Prom." stroke="#00FFFF" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                             <Line yAxisId="right" type="monotone" dataKey="avg_energy" name="Energía Prom." stroke="#48CA34" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                         </LineChart>
                     </ResponsiveContainer>
                </ChartContainer>

                <ChartContainer title="Evolución de la Sonoridad Media (Loudness)" isDark={isDark}>
                     <ResponsiveContainer width="100%" height="100%">
                         <LineChart data={loudnessByYearReal} margin={{ top: 10, right: 30, left: 5, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" />
                             <XAxis dataKey="year" tickCount={10} domain={[1920, 2020]} type="number" allowDuplicatedCategory={false} tick={{ fill: tickColor }} />
                             <YAxis domain={[-22, -4]} label={{ value: 'Loudness (dB)', angle: -90, position: 'insideLeft', fill: tickColor, fontSize: 12 }} tick={{ fill: tickColor }}/>
                             <Tooltip contentStyle={tooltipLineContentStyle} />
                             <Line type="monotone" dataKey="avg_loudness" name="Loudness Prom." stroke="#FF6B6B" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                         </LineChart>
                     </ResponsiveContainer>
                </ChartContainer>
            </div>
        </div>
    );
});

const HallazgosPage = memo(({ isDark }) => {
    const textClasses = 'text-[var(--text-color)]'; const labelClasses = 'text-[var(--text-muted)]'; const cardClasses = `bg-[var(--card-bg-color)] border-[var(--glass-border)]`; const accentColor = 'var(--accent-color)';
    const findings = [
        { title: 'Canciones más Largas (1980-2000)', text: 'El periodo con la duración promedio más alta es el de 1980-2000 (4:03 min).', color: '#00FFFF' },
        { title: 'Loudness Extremo', text: 'La sonoridad media ha aumentado drásticamente (de -19.5 dB a -6.8 dB), reflejando la "Guerra del Volumen".', color: '#0077B6' },
        { title: 'Auge de la Nota C (Do)', text: 'La nota C es la más frecuente, con una moda de más de 20,000 apariciones.', color: '#48CA34' }
    ];
    const conclusions = [
        { title: '1. Producción Adaptada', text: 'La música se produce más "fuerte" y optimizada para el consumo digital.', color: '#00FFFF' },
        { title: '2. Crecimiento de Contenido Explícito', text: 'Aunque la mayoría no es explícita, el porcentaje sigue una tendencia al alza.', color: '#0077B6' },
        { title: '3. Tendencia de la Duración', text: 'La duración promedio no ha cambiado drásticamente en 100 años, pero tiende a estabilizarse o acortarse ligeramente post-2000.', color: '#48CA34' }
    ];

    const decades = dataByDecadeReal.map((d, i) => ({ 
        decade: d.decade, 
        color: ['#00FFFF', '#0077B6', '#48CA34', '#90E0EF', '#FF6B6B'][i % 5], 
        text: `Duración: ${d.avg_duration_min.toFixed(2)} min` 
    }));


     return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12 h-full overflow-y-auto custom-scrollbar">
            <div> <h1 className={`text-3xl font-title-display mb-2 ${textClasses}`}>Hallazgos Clave & Equipo</h1> <p className={`mb-8 font-body-sintony ${labelClasses}`}> Resumen de tendencias (1921-2020) y las personas detrás del análisis. </p> </div>
            {/* Sección Hallazgos y Conclusiones */}
            <section className="space-y-6"> 
                <h2 className={`text-2xl font-title-display mb-4 ${textClasses}`}>Principales Descubrimientos</h2> 
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5"> 
                    {findings.map(item => ( 
                        <div key={item.title} className={`p-5 rounded-lg border shadow-md ${cardClasses} transition-transform transform hover:scale-[1.03]`}> 
                            <h3 className={`text-lg font-title-display`} style={{ color: item.color }}>{item.title}</h3> 
                            <p className={`text-sm font-body-sintony ${labelClasses} mt-2`}>{item.text}</p> 
                        </div> 
                    ))} 
                </div> 

                <h2 className={`text-2xl font-title-display mb-4 mt-10 ${textClasses}`}>Resumen por Rango de Años</h2> 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"> 
                    {decades.map(item => ( 
                        <div key={item.decade} className={`p-4 rounded-lg border shadow-sm ${cardClasses}`}> 
                            <h4 className={`text-xl font-title-display`} style={{ color: item.color }}>{item.decade}</h4> 
                            <p className={`text-sm font-body-sintony ${labelClasses} mt-1`}>{item.text}</p> 
                        </div> 
                    ))} 
                </div> 
                
                <h2 className={`text-2xl font-title-display mb-4 mt-10 ${textClasses}`}>Conclusiones del Análisis</h2> 
                <div className="space-y-5"> 
                    {conclusions.map(item => ( 
                        <div key={item.title} className={`p-5 rounded-lg border-l-4 shadow ${cardClasses}`} style={{ borderColor: item.color }}> 
                            <h3 className={`text-lg font-title-display ${textClasses}`}>{item.title}</h3> 
                            <p className={`text-sm font-body-sintony ${labelClasses} mt-1 leading-relaxed`}>{item.text}</p> 
                        </div> 
                    ))} 
                </div> 
            </section>

            {/* Sección Artistas y Outliers */}
             <section className="mt-16">
                 <h2 className={`text-3xl font-title-display text-center mb-10 text-[var(--text-color)]`}>Datos Destacados del Análisis</h2>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     <TopArtistsChartReal isDark={isDark} /> 
                     <OutlierCardsReal isDark={isDark} />
                 </div>
             </section>

            {/* Sección Equipo */}
            <section className="mt-16 text-center"> 
                <h2 className={`text-3xl font-title-display mb-10 text-[var(--accent-color)] logo-shadow-glow`}> Integrantes del Proyecto </h2> 
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8"> 
                    {teamMembers.map((member, index) => ( 
                        <div key={index} className={`flex flex-col items-center text-center p-4 rounded-lg border ${cardClasses} transition-shadow hover:shadow-xl hover:shadow-[var(--accent-color)]/15`}> 
                            <img src={member.avatar} alt={member.name} onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/80x80/374151/E5E7EB?text=?'; }} className="w-20 h-20 rounded-full mb-4 border-2 object-cover" style={{ borderColor: accentColor }} /> 
                            <h4 className={`text-base font-title-display ${textClasses} font-semibold`}>{member.name}</h4> 
                            <p className={`text-xs font-body-sintony ${labelClasses} mt-1`}>{member.title}</p> 
                        </div> 
                    ))} 
                </div> 
            </section>
            
            {/* Sección Contacto */}
             <section className="mt-16 text-center bg-gradient-to-t from-[var(--card-bg-color)] to-transparent p-8 rounded-lg border-t border-[var(--glass-border)]" > 
                <h2 className={`text-2xl font-title-display mb-3 ${textClasses}`}>Contáctanos</h2> 
                <p className={`mb-6 max-w-2xl mx-auto font-body-sintony ${labelClasses}`}> Conecta para colaboraciones, consultas o para hablar de música y datos. </p> 
                <button className="px-6 py-3 font-body-sintony font-semibold rounded-lg shadow-sm inline-flex items-center gap-2 text-base btn-glass text-[var(--accent-color)] hover:scale-105 transition-transform"> <Send className="w-4 h-4" /> Enviar Mensaje </button> 
                <div className="mt-8"> 
                    <h3 className="text-lg font-title-display mb-4 text-[var(--accent-color)]">Síguenos en Redes</h3> 
                    <div className="flex justify-center gap-6"> 
                        {teamSocials.map((social, index) => { const Icon = social.icon; return ( 
                            <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-all duration-200 transform hover:scale-125 hover:rotate-[-5deg]" aria-label={`Visitar ${social.name}`} title={social.name} > <Icon className="w-7 h-7" /> </a> 
                        ); })} 
                    </div> 
                </div> 
            </section>
        </div>
    );
});

const InicioPage = memo(({ isDark, setActiveTab }) => {
    return (
        <div className="h-full overflow-y-auto custom-scrollbar flex items-center justify-center p-4 md:p-8">
             <HomeCarousel isDark={isDark} setActiveTab={setActiveTab} />
        </div>
    );
});

// =================================================================
// --- PÁGINA INTERACTIVA (A JUGAR) - MEJORADA ---
// =================================================================
const InteractivePage = memo(({ isDark, data }) => { // <-- Acepta 'data'
    
    // Estados para los 3 sliders
    const [bailability, setBailability] = useState(0.60);
    const [duration, setDuration] = useState(3.8);
    const [energy, setEnergy] = useState(0.5); // <-- Nuevo slider

    const [decadeResult, setDecadeResult] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const discoverDecade = useCallback(() => {
        setIsLoading(true); 
        setShowResult(false); 
        setDecadeResult('');
        
        setTimeout(() => {
            // ¡AHORA USA LOS DATOS REALES!
            const decadeAverages = data; // Usa los datos pasados como prop
            
            let bestMatch = data[0].decade; 
            let minDifference = Infinity;

            for (const decadeData of decadeAverages) {
                const avg = decadeData;
                
                // Compara los 3 sliders
                const diffDance = Math.abs(bailability - avg.avg_danceability) * 1.5; // Bailabilidad (más peso)
                const diffDur = Math.abs(duration - avg.avg_duration_min);       // Duración
                const diffEnergy = Math.abs(energy - avg.avg_energy);           // Energía (nuevo)
                
                const totalDifference = diffDance + diffDur + diffEnergy;
                
                if (totalDifference < minDifference) {
                    minDifference = totalDifference;
                    bestMatch = avg.decade;
                }
            }
            
            setDecadeResult(`Tus preferencias (Bailabilidad: ${bailability.toFixed(2)}, Duración: ${duration.toFixed(1)} min, Energía: ${energy.toFixed(2)}) se asemejan más a la música de los **${bestMatch}**.`);
            setShowResult(true); 
            setIsLoading(false);
        }, 600);
     }, [bailability, duration, energy, data]); // <-- Depende de los 3 sliders y los datos

    const cardClasses = `bg-[var(--card-bg-color)] border-[var(--glass-border)]`;
    const textClasses = 'text-[var(--text-color)]'; 
    const labelClasses = 'text-[var(--text-muted)]'; 
    const accentClasses = 'text-[var(--accent-color)]';

     return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 text-[var(--text-color)] h-full overflow-y-auto custom-scrollbar">
            <h1 className={`text-3xl font-title-display mb-4 ${textClasses}`}>¡A Jugar!</h1>
            <p className={`mb-8 font-body-sintony ${labelClasses}`}> Ajusta tus preferencias y descubre qué década musical podría gustarte más según los datos reales (1921-2020). </p>
            <div className={`${cardClasses} p-6 rounded-xl shadow-md border`}>
                <div className="flex items-center gap-3 mb-6"> <Sparkles className={`w-6 h-6 ${accentClasses}`} /> <h2 className={`text-xl font-title-display ${textClasses}`}>Descubre tu Década Musical</h2> </div>
                <div className="space-y-8">
                    {/* Slider 1: Bailabilidad */}
                    <div>
                        <label htmlFor="bailabilityRange" className={`block text-sm font-body-sintony mb-2 ${labelClasses}`}> Nivel de Bailabilidad: <span className={`${accentClasses} font-semibold`}>{bailability.toFixed(2)}</span> </label>
                        <input id="bailabilityRange" type="range" min="0.5" max="0.8" step="0.01" value={bailability} onChange={(e) => setBailability(parseFloat(e.target.value))} className="w-full cursor-pointer" aria-label="Selector de Bailabilidad" />
                        <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1"> <span>Menos Bailable (0.5)</span> <span>Más Bailable (0.8)</span> </div>
                    </div>
                    
                    {/* Slider 2: Duración */}
                    <div>
                         <label htmlFor="durationRange" className={`block text-sm font-body-sintony mb-2 ${labelClasses}`}> Duración Promedio (minutos): <span className={`${accentClasses} font-semibold`}>{duration.toFixed(1)} min</span> </label>
                         <input id="durationRange" type="range" min="3.0" max="4.2" step="0.1" value={duration} onChange={(e) => setDuration(parseFloat(e.target.value))} className="w-full cursor-pointer" aria-label="Selector de Duración" />
                        <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1"> <span>Más Corta (3.0 min)</span> <span>Más Larga (4.2 min)</span> </div>
                    </div>
                    
                    {/* Slider 3: Energía (NUEVO) */}
                    <div>
                        <label htmlFor="energyRange" className={`block text-sm font-body-sintony mb-2 ${labelClasses}`}> Nivel de Energía: <span className={`${accentClasses} font-semibold`}>{energy.toFixed(2)}</span> </label>
                        <input id="energyRange" type="range" min="0.2" max="0.8" step="0.01" value={energy} onChange={(e) => setEnergy(parseFloat(e.target.value))} className="w-full cursor-pointer" aria-label="Selector de Energía" />
                        <div className="flex justify-between text-xs text-[var(--text-muted)] mt-1"> <span>Menos Energía (0.2)</span> <span>Más Energía (0.8)</span> </div>
                    </div>

                    {/* Botón */}
                    <button onClick={discoverDecade} disabled={isLoading} className={`w-full px-5 py-3 font-body-sintony font-semibold rounded-lg shadow-sm inline-flex items-center justify-center gap-2 text-base btn-glass text-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed`} aria-live="polite">
                        {isLoading ? ( <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div> ) : ( 'Descubrir Mi Década' )}
                    </button>
                    
                    {/* Resultado */}
                    {showResult && !isLoading && ( <div className={`mt-6 p-4 rounded-lg text-center border-l-4 animate-fadeInUp bg-gray-800/60 border-[var(--accent-color)]/80`}> <p className={`text-base font-body-sintony ${textClasses}`} dangerouslySetInnerHTML={{ __html: decadeResult.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--accent-color)]">$1</strong>') }} /> </div> )}
                </div>
            </div>
        </div>
    );
});


// --- COMPONENTE PRINCIPAL APP (CORRECCIÓN FINAL) ---
function App() {
  
  // Lógica para obtener el tema inicial (localStorage o S.O.)
  const getInitialTheme = () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'dark';
    }
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [activeTab, setActiveTab] = useState('inicio'); 
  const [isDark, setIsDark] = useState(getInitialTheme); 

  // Lógica para APLICAR el tema al <html>
  useEffect(() => {
     const root = document.documentElement; // Esto es <html>
     
     if (isDark) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
     } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
     }
     
  }, [isDark]); // Se ejecuta cada vez que 'isDark' cambia


  // Navegación
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'explorar', label: 'Explorar Datos', icon: BarChartHorizontalBig },
    { id: 'interactive', label: 'Interactivo', icon: Sparkles },
    { id: 'lab', label: 'Hallazgos', icon: Layers },
  ];

  // Mapeo de componentes
  const pageComponents = {
      inicio: InicioPage,
      explorar: ExplorarDatosPage,
      interactive: InteractivePage,
      lab: HallazgosPage,
  };

  const CurrentPage = pageComponents[activeTab] || InicioPage; 


  return (
    // CORRECCIÓN: Contenedor principal ahora usa las variables CSS del body (definidas en App.css)
    <div className={`flex flex-col h-screen font-body-sintony`}>
       
       {/* HEADER: Usa las variables CSS */}
       <header aria-label="Navegación principal y controles" className={`sticky top-0 z-20 flex items-center justify-between p-4 border-b shadow-md backdrop-blur-lg bg-[var(--header-bg)] border-[var(--header-border)]`}>
        <button onClick={() => setActiveTab('inicio')} className="bg-transparent border-none p-0 cursor-pointer">
           <MusicAnalyticsLogo isDark={isDark} />
        </button>
        <nav role="navigation" aria-label="Secciones del dashboard" className="flex items-center space-x-1 sm:space-x-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-color)] focus:ring-[var(--accent-color)]
                ${ activeTab === item.id
                  ? 'bg-[var(--accent-color-light)] text-[var(--text-color)]' // Estilo Activo
                  : 'text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:bg-[var(--accent-color-light)]' // Estilo Inactivo
              }`}
               title={item.label}
               aria-current={activeTab === item.id ? 'page' : undefined}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">{item.label}</span>
               <span className="sr-only sm:hidden">{item.label}</span>
            </button>
          ))}
          <button
              onClick={() => setIsDark(!isDark)} // El interruptor
              className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:bg-[var(--accent-color-light)] transition-colors duration-200 ml-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-color)] focus:ring-[var(--accent-color)]"
              aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
               title={isDark ? "Modo Claro" : "Modo Oscuro"}
          >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Main */}
       <main role="main" className="flex-grow overflow-hidden relative">
          <div key={activeTab} className="absolute inset-0 h-full animate-fadeInUp">
             {/* CORRECCIÓN: Pasamos los datos reales al juego interactivo */}
            <CurrentPage 
                setActiveTab={setActiveTab} 
                isDark={isDark} 
                data={dataByDecadeReal} // <-- Aquí pasamos los datos
            />
          </div>
       </main>

       {/* Footer */}
       <footer role="contentinfo" className={`flex-shrink-0 p-3 text-center text-xs border-t bg-[var(--header-bg)] border-[var(--header-border)] text-[var(--text-muted)]`}>
         Music Analytics Dashboard © {new Date().getFullYear()} - Datos 1921-2020.
       </footer>
    </div>
  );
}

export default App;