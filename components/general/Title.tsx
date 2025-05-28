import "./styles/title.scss";

type Props = {
  title: string;
  desc?: string;
  className?: string;
};
export default function Title({ title, desc = "", className = "" }: Props) {
  return (
    <div data-aos="fade-down" className={`title-wrapper ${className}`}>
      <h3 className="title">{title}</h3>

      {desc && <p className="desc">{desc}</p>}
    </div>
  );
}
