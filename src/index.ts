import 'module-alias/register';

import cors from 'cors'; 
import express from 'express'; 
import bodyParser from 'body-parser';

import InternRouter from '@routes/intern.route';
import GoogleSheetsRouter from '@routes/googleSheets.route';
import errorHandler from '@middlewares/errorHandler.middleware';


const app = express();

app.use(express.json()); 
app.use(bodyParser.json());
app.use(cors({ origin: '*' })); 

app.use('/api', InternRouter); 
app.use('/api', GoogleSheetsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is online on port ${PORT}`);
});
