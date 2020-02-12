import app from './app';

const main = async () => {
  try {
    app.listen(3001);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

main();
