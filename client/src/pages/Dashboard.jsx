import { useEffect } from "react";
import { useState } from "react";
import Header from "../components/Header";
import api from '../api/axios.js';
import { useLocation, useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import {
  CirclePlay, Clock, Download, FileCheck,
  Mic,
  MicOff,
  ShieldCheck, Sparkles, User, WandSparkles, Zap,
} from "lucide-react";

const Dashboard = () => {
  const [rawText, setRawText] = useState('');
  const [sop, setSop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Keep the textarea in sync with the live transcript while recording
  useEffect(() => {
    if (listening) {
      setRawText(transcript);
    }
  }, [transcript, listening]);

  const handleStartRecording = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopRecording = () => {
    SpeechRecognition.stopListening();
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/sops', { rawText });
      setSop(res.data.sop);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await api.get(`/sops/${sop._id}/export/pdf`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${sop.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
    }
  };


  const location = useLocation();

  useEffect(() => {
    if (location.state?.prefill) {
      setRawText(location.state.prefill);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-10 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* LEFT SECTION */}
        <div className="w-full lg:w-1/2">

          <p className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 font-semibold px-4 py-2 rounded-full shadow-sm">
            <Sparkles size={16} />
            AI-Powered SOP Generator
          </p>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mt-6">
            <span className="text-gray-900 dark:text-white">Create Professional SOPs</span>
            <span className="text-purple-700 dark:text-purple-400"> in Minutes,</span>
            <br />
            <span className="text-gray-900 dark:text-white">Not Hours.</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 leading-8 max-w-xl">
            Generate personalized, professional Standard Operating Procedures
            that help your team work consistently and efficiently.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button className="flex items-center bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold px-6 py-4 rounded-xl shadow-md hover:scale-105 transition-all duration-300">
              <WandSparkles size={20} className="mr-2" />
              Generate SOP
            </button>

            <button onClick={()=> navigate('/how-it-works')}  className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-300 text-gray-800 dark:text-gray-200 font-semibold px-6 py-4 rounded-xl shadow-sm hover:scale-105 transition-all duration-300">
              <CirclePlay size={22} className="mr-2 text-purple-700 dark:text-purple-400" />
              How it Works
            </button>
          </div>

          <ul className="flex flex-wrap gap-4 mt-10">
            <li className="flex items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300">
              <Zap size={18} className="text-purple-700 dark:text-purple-400 mr-2" />AI-Powered
            </li>
            <li className="flex items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300">
              <ShieldCheck size={18} className="text-purple-700 dark:text-purple-400 mr-2" />100% Original
            </li>
            <li className="flex items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300">
              <Clock size={18} className="text-purple-700 dark:text-purple-400 mr-2" />Time Saving
            </li>
            <li className="flex items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300">
              <FileCheck size={18} className="text-purple-700 dark:text-purple-400 mr-2" />ATS-Friendly
            </li>
          </ul>

          <div className="flex flex-wrap gap-8 mt-12">
            <div className="pr-8 border-r border-gray-300 dark:border-gray-600">
              <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400">10K+</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">SOPs Generated</p>
            </div>
            <div className="pr-8 border-r border-gray-300 dark:border-gray-600">
              <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400">98%</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">User Satisfaction</p>
            </div>
            <div className="pr-8 border-r border-gray-300 dark:border-gray-600">
              <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400">95%</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Success Rate</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400">24/7</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">AI Support</p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-1/2 flex flex-col items-center mt-10 gap-4">
          <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 flex flex-col sm:flex-row gap-6">

            {/* Form Column */}
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center shrink-0">
                  <User size={16} className="text-purple-700 dark:text-purple-300" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">Describe your process</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">Paste or type your process. AI will structure it into a professional SOP.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">Your Process</label>
                  <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="e.g., First greet the customer, then ask for their order, then process payment..."
                    maxLength={500}
                    rows={6}
                    className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-purple-400 focus:bg-white dark:focus:bg-gray-600 resize-none"
                  />
                  <p className="text-xs text-gray-400 dark:text-gray-500 text-right mt-1">{rawText.length}/500</p>
                </div>
              </div>

              {browserSupportsSpeechRecognition && (
                <div className="flex justify-end gap-2 mt-1">
                  <button
                    onClick={handleStartRecording}
                    disabled={listening}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${listening
                        ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 animate-pulse'
                        : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200'
                      }`}
                  >
                    <Mic size={14} />
                  </button>
                  <button
                    onClick={handleStopRecording}
                    disabled={!listening}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 disabled:opacity-50"
                  >
                    <MicOff size={14} />
                  </button>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading || !rawText}
                className="w-full mt-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
              >
                <WandSparkles size={16} />
                {loading ? "Generating..." : "Generate SOP"}
              </button>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px bg-gray-100 dark:bg-gray-700 self-stretch" />

            {/* Preview Column */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center shrink-0">
                  <FileCheck size={16} className="text-purple-700 dark:text-purple-300" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">Your SOP Preview</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">AI-generated preview will appear here.</p>
                </div>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto max-h-64">
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {!sop && !error && (
                  <div className="space-y-2">
                    <div className="h-3 w-3/5 bg-purple-100 dark:bg-purple-900 rounded-full" />
                    {[100, 90, 95, 80, 100, 88, 93, 75, 85, 60].map((w, i) => (
                      <div key={i} className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                )}

                {sop && (
                  <div className="space-y-3">
                    <h3 className="font-bold text-purple-700 dark:text-purple-400 text-sm">{sop.title}</h3>
                    {sop.structuredSteps.map((step) => (
                      <div key={step._id} className="bg-purple-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          Step {step.step}: {step.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Role: {step.role}</p>
                        {step.warning && (
                          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">⚠️ {step.warning}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleDownload}
                disabled={!sop}
                className="w-full mt-4 border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 text-gray-700 dark:text-gray-300 disabled:opacity-50 font-medium py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Download size={15} className="text-purple-600 dark:text-purple-400" />
                Download SOP
              </button>
            </div>

          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">Trusted by students and professionals worldwide</p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;