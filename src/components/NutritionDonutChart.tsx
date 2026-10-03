import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Flame, Dumbbell, Sparkles } from 'lucide-react';

interface MacroSegment {
  name: string;
  key: 'protein' | 'carbs' | 'fat' | 'remaining';
  value: number; // in kcal
  grams?: number;
  targetGrams?: number;
  color: string;
  accentColor: string;
}

interface NutritionDonutChartProps {
  currentCalories: number;
  targetCalories: number;
  currentProtein: number;
  targetProtein: number;
  currentCarbs: number;
  targetCarbs: number;
  currentFat: number;
  targetFat: number;
}

export const NutritionDonutChart: React.FC<NutritionDonutChartProps> = ({
  currentCalories,
  targetCalories,
  currentProtein,
  targetProtein,
  currentCarbs,
  targetCarbs,
  currentFat,
  targetFat,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [activeSegment, setActiveSegment] = useState<MacroSegment | null>(null);

  const proteinKcal = Math.round(currentProtein * 4);
  const carbsKcal = Math.round(currentCarbs * 4);
  const fatKcal = Math.round(currentFat * 9);
  const remainingKcal = Math.max(0, targetCalories - currentCalories);
  const calPercent = Math.min(100, Math.round((currentCalories / targetCalories) * 100));

  const data: MacroSegment[] = [
    {
      name: 'Protein',
      key: 'protein',
      value: proteinKcal,
      grams: currentProtein,
      targetGrams: targetProtein,
      color: '#10B981',
      accentColor: '#059669',
    },
    {
      name: 'Carbs',
      key: 'carbs',
      value: carbsKcal,
      grams: currentCarbs,
      targetGrams: targetCarbs,
      color: '#F59E0B',
      accentColor: '#D97706',
    },
    {
      name: 'Fats',
      key: 'fat',
      value: fatKcal,
      grams: currentFat,
      targetGrams: targetFat,
      color: '#F43F5E',
      accentColor: '#E11D48',
    },
  ];

  if (remainingKcal > 0) {
    data.push({
      name: 'Remaining',
      key: 'remaining',
      value: remainingKcal,
      color: '#E5E7EB',
      accentColor: '#D1D5DB',
    });
  }

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 220;
    const height = 220;
    const margin = 10;
    const radius = Math.min(width, height) / 2 - margin;
    const innerRadius = radius * 0.68;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // D3 Pie generator
    const pie = d3
      .pie<MacroSegment>()
      .value((d) => d.value)
      .sort(null)
      .padAngle(0.03);

    // D3 Arc generator
    const arc = d3
      .arc<d3.PieArcDatum<MacroSegment>>()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .cornerRadius(6);

    const arcHover = d3
      .arc<d3.PieArcDatum<MacroSegment>>()
      .innerRadius(innerRadius - 2)
      .outerRadius(radius + 4)
      .cornerRadius(8);

    const arcs = g
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => d.data.color)
      .attr('cursor', 'pointer')
      .style('transition', 'all 0.2s ease')
      .on('mouseenter', function (_event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('d', arcHover as any)
          .attr('fill', d.data.accentColor);
        setActiveSegment(d.data);
      })
      .on('mouseleave', function (_event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr('d', arc as any)
          .attr('fill', d.data.color);
        setActiveSegment(null);
      });

    // Subtle drop shadow / filter for depth
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'donut-shadow').attr('height', '130%');
    filter.append('feDropShadow').attr('dx', '0').attr('dy', '2').attr('stdDeviation', '3').attr('flood-opacity', '0.08');
  }, [currentCalories, targetCalories, currentProtein, currentCarbs, currentFat]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      {/* Left: D3 Donut Chart with Center Text (5 cols) */}
      <div className="md:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-4 p-2">
        <div className="relative w-48 h-48 sm:w-52 sm:h-52 shrink-0 flex items-center justify-center">
          <svg ref={svgRef} className="w-full h-full drop-shadow-xs" />

          {/* Centered Caloric Summary */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4">
            {activeSegment ? (
              <div className="animate-in fade-in zoom-in-95 duration-150">
                <span
                  className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${activeSegment.color}25`, color: activeSegment.accentColor }}
                >
                  {activeSegment.name}
                </span>
                <span className="font-serif font-black text-xl text-neutral-900 block mt-0.5 leading-none">
                  {activeSegment.value} kcal
                </span>
                {activeSegment.grams !== undefined && (
                  <span className="text-[11px] font-semibold text-neutral-500 mt-0.5 block">
                    {activeSegment.grams}g ({Math.round((activeSegment.value / (currentCalories || 1)) * 100)}%)
                  </span>
                )}
              </div>
            ) : (
              <div className="animate-in fade-in duration-200">
                <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">
                  Intake
                </span>
                <span className="font-serif font-black text-2xl text-neutral-900 leading-none">
                  {currentCalories}
                </span>
                <span className="text-[11px] text-neutral-500 font-semibold block mt-0.5">
                  of {targetCalories} kcal
                </span>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                  {calPercent}% Met
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Donut Quick Stats */}
        <div className="text-center sm:text-left space-y-1 sm:border-r sm:border-neutral-100 sm:pr-4">
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block">
            D3 Caloric Distribution
          </span>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-neutral-700 font-medium">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>
              <strong>{remainingKcal}</strong> kcal remaining
            </span>
          </div>
          <p className="text-[11px] text-neutral-400">
            Hover over segments to inspect macro calorie share
          </p>
        </div>
      </div>

      {/* Right: Macro Progress Bars & Goals (7 cols) */}
      <div className="md:col-span-7 space-y-4">
        {/* Protein */}
        <div className="p-3 rounded-2xl bg-neutral-50/80 border border-neutral-100 space-y-1.5 hover:border-emerald-200 transition-colors">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
              <span className="font-bold text-neutral-800">Protein</span>
              <span className="text-[11px] text-neutral-400 hidden sm:inline">
                ({proteinKcal} kcal • {Math.round((proteinKcal / (currentCalories || 1)) * 100)}% of intake)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-neutral-900">
                {currentProtein}g <span className="text-neutral-400 font-normal">/ {targetProtein}g</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800">
                {Math.round((currentProtein / targetProtein) * 100)}%
              </span>
            </div>
          </div>
          <div className="h-2.5 w-full bg-neutral-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, (currentProtein / targetProtein) * 100)}%` }}
            />
          </div>
        </div>

        {/* Carbohydrates */}
        <div className="p-3 rounded-2xl bg-neutral-50/80 border border-neutral-100 space-y-1.5 hover:border-amber-200 transition-colors">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <span className="font-bold text-neutral-800">Carbohydrates</span>
              <span className="text-[11px] text-neutral-400 hidden sm:inline">
                ({carbsKcal} kcal • {Math.round((carbsKcal / (currentCalories || 1)) * 100)}% of intake)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-neutral-900">
                {currentCarbs}g <span className="text-neutral-400 font-normal">/ {targetCarbs}g</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800">
                {Math.round((currentCarbs / targetCarbs) * 100)}%
              </span>
            </div>
          </div>
          <div className="h-2.5 w-full bg-neutral-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, (currentCarbs / targetCarbs) * 100)}%` }}
            />
          </div>
        </div>

        {/* Healthy Fats */}
        <div className="p-3 rounded-2xl bg-neutral-50/80 border border-neutral-100 space-y-1.5 hover:border-rose-200 transition-colors">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
              <span className="font-bold text-neutral-800">Healthy Fats</span>
              <span className="text-[11px] text-neutral-400 hidden sm:inline">
                ({fatKcal} kcal • {Math.round((fatKcal / (currentCalories || 1)) * 100)}% of intake)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-neutral-900">
                {currentFat}g <span className="text-neutral-400 font-normal">/ {targetFat}g</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-rose-100 text-rose-800">
                {Math.round((currentFat / targetFat) * 100)}%
              </span>
            </div>
          </div>
          <div className="h-2.5 w-full bg-neutral-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, (currentFat / targetFat) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
