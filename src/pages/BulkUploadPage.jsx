import Papa from 'papaparse';
import { supabase } from "../lib/supabaseClient"
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, XCircle, FileText } from 'lucide-react';

const BulkUploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);

  const handleFile = async (f) => {
  setFile(f);
  setStatus('uploading');
  setProgress(10);

  Papa.parse(f, {
    header: true,
    skipEmptyLines: true,
    complete: async (results) => {
      try {
        setProgress(50);

        const vendors = results.data.map((row) => ({
          name: row.name,
          phone: row.phone,
          email: row.email,
          gstin: row.gstin,
          address: row.address,
          city: row.city,
        }));

        const { error } = await supabase
  .from('vendors')
  .insert(vendors);

if (error) {
  console.error(error);
  setStatus('error');
  return;
}

// ✅ ADD HERE
alert(`${vendors.length} vendors uploaded`);

setProgress(100);
setStatus('success');
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    },
  });
};

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const onFileInput = (e) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-lg font-semibold text-foreground tracking-tight mb-1">Bulk Upload</h1>
      <p className="text-sm text-muted-foreground mb-6">Upload a CSV file to add multiple vendors at once.</p>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-xl py-20 flex flex-col items-center transition-all duration-200 ${
          isDragging
            ? 'border-gold bg-gold/5'
            : 'border-border bg-secondary/20'
        }`}
      >
        <Upload className={`w-10 h-10 mb-4 ${isDragging ? 'text-gold' : 'text-muted-foreground'}`} />
        <p className="text-sm text-foreground font-medium mb-1">
          {isDragging ? 'Drop your file here' : 'Drag and drop your CSV file'}
        </p>
        <p className="text-xs text-muted-foreground mb-4">or click to browse</p>
        <label className="cursor-pointer bg-surface-hover hover:bg-secondary text-foreground text-sm font-medium px-4 py-2 rounded-md transition-colors">
          Browse Files
          <input type="file" accept=".csv" onChange={onFileInput} className="hidden" />
        </label>
      </div>

      {file && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-5 shadow-card mt-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-foreground font-medium flex-1 truncate">{file.name}</span>
            {status === 'success' && <CheckCircle className="w-5 h-5 text-gold" />}
            {status === 'error' && <XCircle className="w-5 h-5 text-destructive" />}
          </div>

          {status === 'uploading' && (
            <div className="h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          )}

          {status === 'success' && (
            <p className="text-sm text-gold">Upload complete — records will be processed shortly.</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default BulkUploadPage;
