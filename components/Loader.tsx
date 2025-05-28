import classes from "./loader.module.scss";
export default function Loader() {
  return (
    <div className="h-[400px] flex justify-center items-center">
      <span className={classes.loader}></span>
    </div>
  );
}
