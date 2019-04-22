import * as React from "react";

type props = {
  currentPage: number;
  totalPages: number;
  prev: () => void;
  next: () => void;
};

const arrowRight = {
  top: "50%",
  transform: "translate(0,-50%)",
  cursor: "pointer",
  right: "0px",
  position: "fixed" as any,
  display: "block"
};

const arrowLeft = {
  top: "50%",
  transform: "translate(0,-50%)",
  cursor: "pointer",
  left: "0px",
  position: "fixed" as any,
  display: "block"
};

export default class Paging extends React.Component<props, {}> {
  public render() {
    const { currentPage, totalPages, prev, next } = this.props;

    return (
      <div>
        <button
          disabled={currentPage == 1}
          className="btn btn-secondary"
          onClick={prev.bind(this)}
          style={arrowLeft}
        >
          <span
            style={{ fontSize: "2em" }}
            className="glyphicon glyphicon-chevron-left"
          />
        </button>
        <button
          disabled={currentPage == totalPages}
          className="btn btn-secondary"
          onClick={next.bind(this)}
          style={arrowRight}
        >
          <span
            style={{ fontSize: "2em" }}
            className="glyphicon glyphicon-chevron-right"
          />
        </button>
      </div>
    );
  }
}
