import * as React from "react";
import Modal from "react-responsive-modal";
import { CreditCard } from "react-kawaii";

type props = {
  closeModal: () => void;
  status: boolean;
};

export default class SubmitStatus extends React.Component<props, {}> {
  render() {
    return (
      <Modal
        open={true}
        onClose={() => this.props.closeModal()}
        classNames={{
          overlay: "custom-overlay",
          modal: "custom-modal"
        }}
        showCloseIcon={true}
        center
      >
        <div className="text-center">
          <br />
          <CreditCard
            size={200}
            mood={this.props.status == true ? "blissful" : "sad"}
            color="#53B948"
          />
          {this.props.status == true && (
            <div>
              <h3 className="oswald-header">Success!</h3>
              <h4
                style={{ fontFamily: "'Oswald', sans-serif", color: "black" }}
              >
                You'll be hearing from us soon.
              </h4>
            </div>
          )}
          {this.props.status == false && (
            <div>
              <h3 className="oswald-header">Uh oh!</h3>
              <h4 style={{ color: "black" }}>That didn't work.</h4>
              <h4 style={{ color: "black" }}>
                Please logout, log back in, and try again.
              </h4>
            </div>
          )}
        </div>
      </Modal>
    );
  }
}
