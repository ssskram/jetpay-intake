import * as React from "react";
import { Document, Page } from "react-pdf";
import Paging from "../utilities/paging";
import Spinner from "../utilities/spinner";

type state = {
  numPages: number;
  pageNumber: number;
};

export default class Policy extends React.Component<{}, state> {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1
    };
  }

  componentDidMount() {
    this.scrollUp();
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  prev = () =>
    this.setState({ pageNumber: this.state.pageNumber - 1 }, () =>
      this.scrollUp()
    );
  next = () =>
    this.setState({ pageNumber: this.state.pageNumber + 1 }, () =>
      this.scrollUp()
    );

  scrollUp = () => window.scrollTo(0, 0);

  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <div>
        <div style={{ padding: "25px 0px 50px 0px" }}>
          <Document
            className="center-me"
            file="files/Policy.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
            loading={<Spinner notice="...loading document..." />}
          >
            <Page pageNumber={pageNumber} scale={1.5} />
          </Document>
        </div>
        <Paging
          prev={this.prev.bind(this)}
          next={this.next.bind(this)}
          currentPage={pageNumber}
          totalPages={numPages}
        />
      </div>
    );
  }
}
