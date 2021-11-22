import Link from "next/link";
import { Button } from "@material-ui/core";

const Services = () => {
  return (
    <div className="services">
      <h1 className="l-headers">
        Serv<span>ices</span>
      </h1>
      <div className="serve-wrap">
        <div className="rows-s">
          <h3>1</h3>
          <p>We offer mentorship for forex and crypto traders </p>
        </div>
        <div className="rows-s">
          <h3>2</h3>
          <p>We tutor on forex, binary options and futures</p>
        </div>
        <div className="rows-s">
          <h3>3</h3>
          <p>We offer investment services</p>
        </div>
        <div className="rows-s r-b">
          <Link href="/" passHref>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              style={{
                border: "2px solid white",
                color: "white",
                width: "110px",
              }}
            >
              home
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              style={{
                border: "2px solid white",
                color: "white",
                width: "110px",
              }}
            >
              support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
