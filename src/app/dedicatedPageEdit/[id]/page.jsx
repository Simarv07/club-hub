"use client";

import React from 'react';

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import section2Styles from './section2.module.scss';
import section3Styles from './section3.module.scss';
import section4Styles from './section4.module.scss';

export default function ClubPageEvents() {

  const router = useRouter();
  const pathname = usePathname();
  const club_id = pathname.split("/")[2];

  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [clubCampusId, setClubCampusId] = useState(0);
  const [clubEmail, setClubEmail] = useState("");
  const [clubBanner, setClubBanner] = useState("");
  const [clubIsPrivate, setClubIsPrivate] = useState("Private");
  const [campusName, setCampusName] = useState("");
  const [campusAddress, setCampusAddress] = useState("");
  const [campuses, setCampuses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitClub();
    submitCampus();
  };

  useEffect(() => {
    fetch(`/api/club/${club_id}`)
      .then((res) => res.json())
      .then((data) => {
        setClubName(data.name);
        setClubDescription(data.description);
        setClubCampusId(data.campusId);
        setClubEmail(data.email);
        setClubBanner(data.banner);

        if(data.isPrivate == false){
          setClubIsPrivate("Public");
        }
      });
  }, [club_id]);

  useEffect(() => {
  fetch(`/api/campus`)
    .then((res) => res.json())
    .then((data) => {
      setCampuses(data);
    });
  });

  async function submitClub() {
    const res = await fetch(`/api/club/${club_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: clubName,
        email: clubEmail,
        description: clubDescription,
      }),
    });
  }

  async function submitCampus() {
    const res = await fetch(`/api/campus/${clubCampusId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: campusAddress,
      }),
    });
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
      <div className={section2Styles.flex_row}>
        <img className={section2Styles.image6} src={clubBanner} alt="alt text" />
        {/* '/assets/aea99ada115ff3911f9f589ad27ae004.png' */}
        <div className={section2Styles.flex_col}>
          <input className={section2Styles.content_box} value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder={clubName}/>
          <div className={section2Styles.flex_row1}>
            <img
              className={section2Styles.image3}
              src={'/assets/a0b8f9258bd9a75755a6cd13ead688e0.png'}
              alt="alt text"
            />
            {campuses.map((campus) => (
              <span key={campus.id}>
                {clubCampusId === campus.id && <h3 className={section2Styles.subtitle}>{campus.name}</h3>}
              </span>
            ))}
          </div>

          <div className={section2Styles.flex_row2}>
            <img
              className={section2Styles.image3}
              src={'/assets/433fa6699ca1be2c2e0b2e6236e51ed5.svg'}
              alt="alt text"
            />
            <h3 className={section2Styles.subtitle1}>{clubIsPrivate}</h3>
          </div>

          <button className={section2Styles.btn} type="submit">SAVE</button>
        </div>
      </div>
      <div className={section3Styles.flex_row}>
        <a href={`../../dedicatedPage/${club_id}`}>
          <button className={section3Styles.subtitle1}>About</button>
        </a>
        <a href={`../../clubPageEvents/${club_id}`}>
          <button className={section3Styles.subtitle1}>Events</button>
        </a>
        <a href={`../../members/${club_id}`}>
        <button className={section3Styles.subtitle1}>Members</button>
        </a>
      </div>
      <div className={section4Styles.flex_row}>
        <textarea className={section4Styles.content_box1} value={clubDescription} onChange={(e) => setClubDescription(e.target.value)} placeholder={clubDescription}></textarea>

        <div className={section4Styles.flex_col}>
          <div className={section4Styles.flex_row1}>
            <img
              className={section4Styles.image4}
              src={'/assets/8961133439bbbf471da5bd11f08914fc.png'}
              alt="alt text"
            />
            <input className={section4Styles.content_box2} value={clubEmail} onChange={(e) => setClubEmail(e.target.value)} placeholder={clubEmail}/>
          </div>

          <div className={section4Styles.flex_row2}>
            <img
              className={section4Styles.image41}
              src={'/assets/6922a51e98d3431ae8de16a12e63d27d.png'}
              alt="alt text"
            />
            {campuses.map((campus) => (
              <span key={campus.id}>
                {clubCampusId === campus.id && <textarea className={section4Styles.content_box2} value={campus.address} onChange={(e) => setCampusAddress(e.target.value)} placeholder={campus.address}/>}
              </span>
            ))}
          </div>
        </div>
      </div>
      </form>
    </section>
  );
}
