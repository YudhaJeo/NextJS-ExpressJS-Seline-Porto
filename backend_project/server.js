import app from './src/app.js';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
