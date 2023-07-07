import Button from "@mui/material/Button";

export default function Myhotelscard(props) {
  const handleClick = () => {
    let hotelid = props.id;
    console.log("hotel id: ", hotelid);
    const url = "http://localhost:3000/adminpanel/" + hotelid + "/statistics";
    window.location.href = url;
  };
  const { hotel } = props;

  let description = "No description provided";
  if (hotel.description !== "") {
    description = hotel.description;
  }

  return (
    <div className="col">
      <div className="card h-100 p-1">
        <img src={props.img} className="card-img-top" alt={`image of ${hotel.name}`} />
        <div className="card-body">
          <h5 className="card-title">{hotel.name}</h5>
          <>{hotel.city}{", "}{hotel.country}</>
          <p className="card-text">{description}</p>
        </div>
        <div className="card-footer myhotels">
          <Button
            variant="contained"
            onClick={handleClick}
          >
            View details
          </Button>
        </div>
      </div>
    </div>
  );
}
