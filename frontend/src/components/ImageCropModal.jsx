'use client';

import { useState, useRef, useEffect } from 'react';

export default function ImageCropModal({ imageSrc, onClose, onCropComplete }) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      drawPreview();
    };
  }, [imageSrc]);

  useEffect(() => {
    drawPreview();
  }, [zoom, offset]);

  const drawPreview = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Draw background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, size, size);

    ctx.save();
    ctx.translate(size / 2 + offset.x, size / 2 + offset.y);
    ctx.scale(zoom, zoom);

    // Center image
    const minDim = Math.min(img.width, img.height);
    const scale = size / minDim;
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;

    ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    ctx.restore();
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const croppedFile = new File([blob], 'profile_cropped.png', { type: 'image/png' });
        onCropComplete(croppedFile);
      }
    }, 'image/png', 0.95);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <i className="ri-crop-line text-indigo-600 text-xl font-bold"></i>
            <h3 className="font-extrabold text-slate-900 text-base">Crop & Adjust Profile Image</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Canvas Crop Area */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <div
            className="relative w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-indigo-500 shadow-xl cursor-grab active:cursor-grabbing bg-slate-100"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute inset-0 pointer-events-none border border-white/40 rounded-full"></div>
          </div>
          <p className="text-[11px] text-slate-400 font-semibold">
            💡 Drag image to position inside the circular frame
          </p>
        </div>

        {/* Zoom Slider */}
        <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          <div className="flex justify-between items-center text-xs font-bold text-slate-700">
            <span>Zoom / Scale</span>
            <span className="text-indigo-600">{Math.round(zoom * 100)}%</span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="ri-zoom-out-line text-slate-400 text-sm"></i>
            <input
              type="range"
              min="0.8"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <i className="ri-zoom-in-line text-slate-400 text-sm"></i>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 btn-gradient text-white font-bold rounded-2xl text-xs shadow-md shadow-indigo-200 hover:opacity-95 flex items-center space-x-1.5"
          >
            <i className="ri-check-line text-base"></i>
            <span>Apply & Upload</span>
          </button>
        </div>
      </div>
    </div>
  );
}
