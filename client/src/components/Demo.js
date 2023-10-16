import {Helmet} from "react-helmet"

const Demo = props => {
    return (<div className="application">
                <Helmet>
                  <script src="./homepage.js" type="text/javascript" />
                </Helmet>
            </div>
    );
  }

  export default  Demo;