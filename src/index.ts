import express from 'express'; 
import cors from 'cors'; 
import bodyParser from 'body-parser'

import InternRouter from './routes/intern.route';
import GoogleSheetsRouter from './routes/googleSheets.route';

const app = express();

app.use(express.json()); 
app.use(cors({ origin: '*' })); 

app.use('/api', InternRouter); 
app.use('/api', GoogleSheetsRouter);

app.use(bodyParser())

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is online on port ${PORT}`);
});
