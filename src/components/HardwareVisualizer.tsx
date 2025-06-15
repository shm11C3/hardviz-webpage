"use client";

import { BarChart3, Cpu, Gauge, Minus, Square, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function HardwareMonitor() {
  const [cpuUsage, setCpuUsage] = useState(14);
  const [memoryUsage, setMemoryUsage] = useState(49);
  const [gpuUsage, setGpuUsage] = useState(0);
  const [gpuTemp, setGpuTemp] = useState(36);

  // 動的に値を更新するエフェクト
  useEffect(() => {
    // CPU使用率のシミュレーション
    const cpuInterval = setInterval(() => {
      setCpuUsage((prev) => {
        const change = Math.floor(Math.random() * 7) - 3; // -3から3の範囲でランダムに変化
        const newValue = prev + change;
        return Math.min(Math.max(newValue, 5), 95); // 5%から95%の範囲に制限
      });
    }, 2000);

    // メモリ使用率のシミュレーション
    const memoryInterval = setInterval(() => {
      setMemoryUsage((prev) => {
        const change = Math.floor(Math.random() * 5) - 2; // -2から2の範囲でランダムに変化
        const newValue = prev + change;
        return Math.min(Math.max(newValue, 40), 60); // 40%から60%の範囲に制限
      });
    }, 3000);

    // GPU使用率のシミュレーション
    const gpuUsageInterval = setInterval(() => {
      setGpuUsage((prev) => {
        const change = Math.floor(Math.random() * 10) - 2; // -2から8の範囲でランダムに変化（上昇傾向）
        const newValue = prev + change;
        return Math.min(Math.max(newValue, 0), 30); // 0%から30%の範囲に制限
      });
    }, 4000);

    // GPU温度のシミュレーション
    const gpuTempInterval = setInterval(() => {
      setGpuTemp((prev) => {
        const change = Math.floor(Math.random() * 3) - 1; // -1から1の範囲でランダムに変化
        const newValue = prev + change;
        return Math.min(Math.max(newValue, 34), 40); // 34°Cから40°Cの範囲に制限
      });
    }, 5000);

    return () => {
      clearInterval(cpuInterval);
      clearInterval(memoryInterval);
      clearInterval(gpuUsageInterval);
      clearInterval(gpuTempInterval);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#1a2234] shadow-2xl">
      {/* Windows風のタイトルバー */}
      <div className="flex items-center justify-between border-slate-700 border-b bg-[#141b2d] px-4 py-2">
        <div className="flex items-center">
          <picture>
            <source srcSet="/app-icon.webp" type="image/webp" />
            <img
              className="mr-2 h-5 w-5"
              src="/app-icon.png"
              alt="HardwareVisualizer Icon"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </picture>
          <span className="text-slate-200 text-sm">HardwareVisualizer</span>
        </div>
        <div className="flex">
          <button
            type="button"
            className="p-1.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="p-1.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <Square className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="p-1.5 text-slate-400 transition-colors hover:bg-red-600 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* CPU Section */}
          <div className="rounded-lg bg-[#141b2d] p-4">
            <div className="mb-3 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-cyan-400" />
              <h3 className="font-medium text-white">CPU</h3>
            </div>
            <div className="mb-3 flex items-center justify-center">
              <div className="relative h-24 w-24">
                <div className="absolute inset-0 rounded-full border-4 border-[#1e2a45]" />
                <div
                  className="absolute inset-0 rounded-full border-4 border-cyan-400 border-r-transparent border-b-transparent border-l-transparent"
                  style={{ transform: `rotate(${cpuUsage * 3.6 + 45}deg)` }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-bold text-2xl text-white">
                    {cpuUsage}%
                  </span>
                  <span className="flex items-center text-slate-400 text-xs">
                    <Zap size={12} className="mr-1" />
                    Usage
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-300 text-xs">
              <div>
                <p className="text-slate-400">Name</p>
                <p>AMD Ryzen 7 7800X3D</p>
              </div>
              <div>
                <p className="text-slate-400">Vendor</p>
                <p>AMD</p>
              </div>
              <div>
                <p className="text-slate-400">Core Count</p>
                <p>16</p>
              </div>
              <div>
                <p className="text-slate-400">Default Clock Speed</p>
                <p>4201 MHz</p>
              </div>
            </div>
          </div>

          {/* RAM Section */}
          <div className="rounded-lg bg-[#141b2d] p-4">
            <div className="mb-3 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-400" />
              <h3 className="font-medium text-white">RAM</h3>
            </div>
            <div className="mb-3 flex items-center justify-center">
              <div className="relative h-24 w-24">
                <div className="absolute inset-0 rounded-full border-4 border-[#1e2a45]" />
                <div
                  className="absolute inset-0 rounded-full border-4 border-emerald-400 border-r-transparent"
                  style={{ transform: `rotate(${memoryUsage * 3.6}deg)` }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-bold text-2xl text-white">
                    {memoryUsage}%
                  </span>
                  <span className="flex items-center text-slate-400 text-xs">
                    <Zap size={12} className="mr-1" />
                    Usage
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-300 text-xs">
              <div>
                <p className="text-slate-400">Memory Type</p>
                <p>DDR5</p>
              </div>
              <div>
                <p className="text-slate-400">Total Memory</p>
                <p>64.0 GB</p>
              </div>
              <div>
                <p className="text-slate-400">Memory Slots</p>
                <p>2/4</p>
              </div>
              <div>
                <p className="text-slate-400">Memory Clock Speed</p>
                <p>5600 MHz</p>
              </div>
            </div>
          </div>
        </div>

        {/* GPU Section */}
        <div className="mt-4 rounded-lg bg-[#141b2d] p-4">
          <div className="mb-3 flex items-center gap-2">
            <Gauge className="h-5 w-5 text-amber-400" />
            <h3 className="font-medium text-white">GPU</h3>
          </div>
          <div className="mb-3 flex justify-around">
            <div className="flex flex-col items-center">
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 rounded-full border-4 border-[#1e2a45]" />
                <div
                  className="absolute inset-0 rounded-full border-4 border-amber-400 border-r-transparent border-b-transparent border-l-transparent"
                  style={{ transform: `rotate(${gpuUsage * 3.6 + 45}deg)` }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-bold text-white text-xl">
                    {gpuUsage}%
                  </span>
                  <span className="flex items-center text-slate-400 text-xs">
                    <Zap size={12} className="mr-1" />
                    Usage
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 rounded-full border-4 border-[#1e2a45]" />
                <div
                  className="absolute inset-0 rounded-full border-4 border-orange-500 border-r-transparent border-b-transparent border-l-transparent"
                  style={{
                    transform: `rotate(${(gpuTemp - 30) * 12 + 45}deg)`,
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-bold text-white text-xl">
                    {gpuTemp}°C
                  </span>
                  <span className="text-slate-400 text-xs">Temp</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-slate-300 text-xs">
            <div>
              <p className="text-slate-400">Name</p>
              <p>NVIDIA GeForce RTX 5080</p>
            </div>
            <div>
              <p className="text-slate-400">Vendor</p>
              <p>NVIDIA</p>
            </div>
            <div>
              <p className="text-slate-400">Memory Size</p>
              <p>31.6 GB</p>
            </div>
            <div>
              <p className="text-slate-400">Memory Size (Dedicated)</p>
              <p>15.9 GB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
