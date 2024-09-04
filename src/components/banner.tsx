interface BannerProps {
  imgPath: string;
  imgAlt: string;
}

export function Banner(props: BannerProps) {
  return (
    <div className="max-md:hidden h-screen bg-cyan-600 max-w-[980px] w-full flex items-center justify-center">
      <img
        src={props.imgPath}
        alt={props.imgAlt}
        className="max-w-[680px] w-full"
      />
    </div>
  );
}
