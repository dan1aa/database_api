import 'module-alias/register';
import app from "@utils/app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is online on port ${PORT}`);
});
