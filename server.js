const app = require('./app');

const PORT = process.env.PORT || 5000; // Render sets PORT automatically

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});