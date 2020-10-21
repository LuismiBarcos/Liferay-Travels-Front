import React from "react";

import UsersList from "../components/UsersList";
import TripList from "../components/TripList";

export default ({ viewModel: homeViewModel }) => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 mt-3">
            <UsersList homeViewModel={homeViewModel} />
          </div>
          <div className="col-9">
            <TripList homeViewModel={homeViewModel} />
          </div>
        </div>
      </div>
    </div>
  );
};
