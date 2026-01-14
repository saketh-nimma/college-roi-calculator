body {
  background: linear-gradient(to right, #fef9ff, #f0f4f8);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1100px;
  background: white;
  margin: 40px auto;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

h1 {
  text-align: center;
  color: #3b82f6;
}

p {
  text-align: center;
  color: #374151;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.controls button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background-color: #2563eb;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.controls button:hover {
  background-color: #1e40af;
}

.college-section {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.college-input {
  background: #f3f4f6;
  padding: 20px;
  border-radius: 12px;
  min-width: 280px;
  position: relative;
}

.college-input h3 {
  text-align: center;
  color: #1e3a8a;
  margin-top: 0;
}

.college-input .remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
}

.college-input label {
  display: block;
  margin-top: 12px;
  font-weight: 600;
}

.college-input input[type=range] {
  width: 100%;
  margin-top: 6px;
}

.results {
  margin-top: 25px;
  background: #f0f9ff;
  padding: 20px;
  border-radius: 12px;
}

#roiChart {
  margin-top: 30px;
  background: #fef3c7;
  border-radius: 12px;
  padding: 15px;
}
