import React, { useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router";
import { useEffect } from "react";

const Profile = ({ userObj }) => {
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
