import '../../assets/styles/summery.css'
const Summery = ({ data }: any) => {
  return (
    <>
      <div className="dashed center-abs ">
        <div className="p-3 " dangerouslySetInnerHTML={{ __html :data?.summary }}></div>
      </div>
    </>
  );
};

export default Summery;
