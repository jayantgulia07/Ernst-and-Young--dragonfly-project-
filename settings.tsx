import React, { useState } from 'react';
import { X } from 'lucide-react';

type Props = {
  onClose: () => void;
};

const Settings: React.FC<Props> = ({ onClose }) => {
  const [advancedMode, setAdvancedMode] = useState(true);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-2xl w-[800px] max-w-[90%] max-h-[90vh] shadow-2xl relative flex flex-col">
        <button onClick={onClose} className="absolute top-3 right-4 text-xl font-bold text-gray-700 hover:text-red-600">
          ✕
        </button>

        <div className="overflow-y-auto pr-2 flex-1">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4">Chat Configuration</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <select className="w-full border border-gray-300 rounded-md p-2">
                  <option>ABG IntelAct 1.0</option>
                  <option>NovaMind-X</option>
                  <option>CortexAI v2</option>
                  <option>NeuraSpeak 3.5</option>
                  <option>SynthAI Core</option>
                  <option>EchoBrain v1.2</option>
                  <option>QuantumText AI</option>
                  <option>LogixGPT</option>
                  <option>VisionaryML 2.0</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Persona</label>
                <select className="w-full border border-gray-300 rounded-md p-2">
                  <option>Creative</option>
                  <option>Friendly</option>
                  <option>Professional</option>
                  <option>Concise</option>
                  <option>Detailed</option>
                  <option>Humorous</option>
                  <option>Empathetic</option>
                  <option>Technical</option>
                  <option>Socratic</option>
                  <option>Narrative</option>
                  <option>Minimalist</option>
                  <option>Visionary</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="accent-green-600 w-5 h-5" />
                <span className="text-sm text-gray-700">Allow this chat to use the documents uploaded</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={advancedMode}
                  onChange={() => setAdvancedMode(!advancedMode)}
                  className="accent-green-600 w-5 h-5"
                />
                <span className="text-sm text-gray-700">Enable Advanced Mode</span>
              </label>
            </div>

            

            {/* For Sliders */}
            {advancedMode && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">


                {/* Max Token */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Max Token: <span id="maxTokenVal">99363</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="131072"
                    defaultValue="99363"
                    className="w-full accent-black"
                    onInput={(e) =>
                      (document.getElementById('maxTokenVal')!.innerText = (e.target as HTMLInputElement).value)
                    }
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0</span><span>Max: 131072</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    The maximum number of tokens to generate in the chat completion. The total length of input tokens and generated tokens is limited by the model’s context length.
                  </p>
                </div>

                {/* Temperature */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Temperature: <span id="temperatureVal">1.6</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    defaultValue="1.6"
                    className="w-full accent-black"
                    onInput={(e) =>
                      (document.getElementById('temperatureVal')!.innerText = (e.target as HTMLInputElement).value)
                    }
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0</span><span>Max: 2</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    What sampling temperature to use, between 0 and 2. Higher values make output more random; lower values more focused. (Default: 1)
                  </p>
                </div>

                {/* Top P */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Top P: <span id="topPVal">1</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    defaultValue="1"
                    className="w-full accent-black"
                    onInput={(e) =>
                      (document.getElementById('topPVal')!.innerText = (e.target as HTMLInputElement).value)
                    }
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>0</span><span>Max: 1</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Number between 0 and 1. Nucleus sampling based on top p probability mass. Recommend changing temperature or top p, not both. (Default: 1)
                  </p>
                </div>

                {/* Presence Penalty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Presence Penalty: <span id="presencePenaltyVal">0</span>
                  </label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    defaultValue="0"
                    className="w-full accent-black"
                    onInput={(e) =>
                      (document.getElementById('presencePenaltyVal')!.innerText = (e.target as HTMLInputElement).value)
                    }
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>-2</span><span>Max: 2</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Positive values penalize new tokens based on appearance so far, encouraging new topics. (Default: 0)
                  </p>
                </div>

                {/* Frequency Penalty */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Frequency Penalty: <span id="frequencyPenaltyVal">0</span>
                  </label>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.1"
                    defaultValue="0"
                    className="w-full accent-black"
                    onInput={(e) =>
                      (document.getElementById('frequencyPenaltyVal')!.innerText = (e.target as HTMLInputElement).value)
                    }
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>-2</span><span>Max: 2</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Penalizes tokens that occur too frequently. Helps reduce repetition. (Default: 0)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-white bg-zinc-600 border rounded-lg text-sm hover:bg-zinc-900">
            Cancel
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-zinc-600 text-white rounded-lg text-sm hover:bg-zinc-900">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
