// Interface: Commentable (Object can be commented on) comments, commentCount, commenter
// Interface: Voteable (Object can be voted on) upvotes, upvoteCount, hidden, hiddenCount,
// Data Type: Comment, can be on a news item or another comment
// Every time an upvote/downvote/comment is made, update the count

import { CommentModel, StoryModel, UserModel } from './models';

const now = Date.now() - 1000;

export const sampleData: {
  comments: CommentModel[];
  top: number[];
  new: number[];
  topStoriesCache: StoryModel[];
  newStoriesCache: StoryModel[];
  newsItems: StoryModel[];
  users: UserModel[];
} = {
  /* A ranking of the hottest posts */
  top: [
    1224, 1225, 1226, 1222, 1223, 1227, 1228, 1229, 1230, 1231, 1232, 1233, 1234, 1235, 1236, 1237,
    1238, 1239, 1240, 1241, 1242, 1243, 1244, 1245, 1246, 1247, 1248, 1249, 1250, 1251,
  ],
  new: [
    1251, 1250, 1249, 1248, 1247, 1246, 1245, 1244, 1243, 1242, 1241, 1240, 1239, 1238, 1237, 1236,
    1235, 1234, 1233, 1232, 1231, 1230, 1229, 1228, 1227, 1226, 1225, 1224, 1223, 1222,
  ],
  topStoriesCache: [
    {
      id: 1224,
      commentCount: 44,
      comments: [15289630, 15289567],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: '“Learning How to Learn,” the most popular course on Coursera',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1225,
      commentCount: 38,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'luu',
      text: null,
      title: 'Weird Python Integers',
      type: 'story',
      upvoteCount: 125,
      upvotes: new Set(),
      url: 'https://kate.io/blog/2017/08/22/weird-python-integers/',
    },
  ],
  newStoriesCache: [
    {
      id: 2000,
      commentCount: 44,
      comments: [],
      creationTime: new Date().valueOf(),
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'new_user',
      text: null,
      title: 'I love graphQL!!',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.graphql.org',
    },
  ],
  newsItems: [
    {
      id: 1224,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: '“Learning How to Learn,” the most popular course on Coursera',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1225,
      commentCount: 38,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'luu',
      text: null,
      title: 'Weird Python Integers',
      type: 'story',
      upvoteCount: 125,
      upvotes: new Set(),
      url: 'https://kate.io/blog/2017/08/22/weird-python-integers/',
    },
    {
      id: 1226,
      commentCount: 101,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'aLee',
      text: null,
      title: 'I spent my career in tech and wasn’t prepared for its effect on my kids',
      type: 'story',
      upvoteCount: 90,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1222,
      commentCount: 0,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'clintonwoo',
      text: null,
      title: 'Clinton wins again',
      type: 'story',
      upvoteCount: 122,
      upvotes: new Set(['clintonwoo', 'john']),
      url: 'https://www.shavelikeaboss.com.au',
    },
    {
      id: 1223,
      // upvoteCount: 0,
      commentCount: 1,
      comments: [123331],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'john',
      text: "It's unbelievable.",
      title: 'Clinton wins yet another time',
      type: 'story',
      upvoteCount: 20,
      upvotes: new Set(),
      url: undefined,
    },
    {
      id: 1227,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Water Found Deep Inside the Moon',
      type: 'story',
      upvoteCount: 455,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1228,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'How did “Handbook for Mortals” get on the NYT bestseller list?',
      type: 'story',
      upvoteCount: 331,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1229,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Titan in depth: Security in plaintext',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1230,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'The Librem 5: A Matrix-Native FLOSS Smartphone',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1231,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Generic GPU Kernels in Julia',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1232,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'VW Strike in Slovakia Exposes a European Divide',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1233,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Gtk-rs: The huge and long awaited release is finally here',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1234,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: "Rich Hickey's Greatest Hits",
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1235,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Tesla’s Push to Build a Self-Driving Car Sparks Dissent Among Its Engineers',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1236,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'How Redlining’s Racist Effects Lasted for Decades',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1237,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Uber, Mired in Corporate Scandals, Sees Uptick in Bookings',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1238,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Feather: Open-source icons',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1239,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Spacex Launch Webcast: Formosat-5 Mission',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1240,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Ask HN: What is your favorite CS paper?',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1241,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Launch HN: Life Bot (YC S17) – Voice app to help with daily activities',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1242,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Debian reproducibility statistics',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1243,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'The Scotsmen Who Invented Modernity',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1244,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Deterministic Browser',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1245,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Deep Learning for Siri’s Voice',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1246,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: "I'm giving up on HPKP",
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1247,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Introducing App Engine Firewall',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1248,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Profiling Internet Users in Africa: Insights from the Google Play Store',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1249,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Turing.jl: A Fresh Approach to Probabilistic Programming in Julia',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1250,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'GCC tiny',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },
    {
      id: 1251,
      commentCount: 44,
      comments: [],
      creationTime: 1504740146516,
      hidden: false,
      hiddenCount: 0,
      hides: [],
      submitterId: 'hvo',
      text: null,
      title: 'Tesorio is hiring engineers and a product designer to modernize finance teams',
      type: 'story',
      upvoteCount: 171,
      upvotes: new Set(),
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
    },

    // 4.
    // Water Found Deep Inside the Moon (nationalgeographic.com)
    // 231 points by chenster 6 hours ago | hide | 121 comments
    // 5.
    // How did “Handbook for Mortals” get on the NYT bestseller list? (pajiba.com)
    // 48 points by cratermoon 1 hour ago | hide | 14 comments
    // 6.
    // Titan in depth: Security in plaintext (googleblog.com)
    // 39 points by nealmueller 1 hour ago | hide | 4 comments
    // 7.
    // The Librem 5: A Matrix-Native FLOSS Smartphone (matrix.org)
    // 307 points by Arathorn 6 hours ago | hide | 103 comments
    // 8.
    // Generic GPU Kernels in Julia (mikeinnes.github.io)
    // 60 points by one-more-minute 2 hours ago | hide | 1 comment
    // 9.
    // VW Strike in Slovakia Exposes a European Divide (bloomberg.com)
    // 41 points by CrocodileStreet 2 hours ago | hide | 9 comments
    // 10.
    // Gtk-rs: The huge and long awaited release is finally here (gtk-rs.org)
    // 19 points by trextrex 1 hour ago | hide | 2 comments
    // 11.
    // Rich Hickey's Greatest Hits (changelog.com)
    // 30 points by tosh 2 hours ago | hide | discuss
    // 12.
    // Tesla’s Push to Build a Self-Driving Car Sparks Dissent Among Its Engineers (wsj.com)
    // 112 points by dcgudeman 3 hours ago | hide | 137 comments
    // 13.
    // How Redlining’s Racist Effects Lasted for Decades (nytimes.com)
    // 11 points by zonotope 1 hour ago | hide | 1 comment
    // 14.
    // Uber, Mired in Corporate Scandals, Sees Uptick in Bookings (nytimes.com)
    // 63 points by carlchenet 4 hours ago | hide | 64 comments
    // 15.
    // Feather: Open-source icons (feathericons.com)
    // 669 points by mcone 7 hours ago | hide | 109 comments
    // 16.
    // Spacex Launch Webcast: Formosat-5 Mission (spacex.com)
    // 51 points by cjnicholls 1 hour ago | hide | 38 comments
    // 17.
    // Ask HN: What is your favorite CS paper?
    // 492 points by lainon 8 hours ago | hide | 165 comments
    // 18.
    // Launch HN: Life Bot (YC S17) – Voice app to help with daily activities
    // 34 points by MerryOscar 3 hours ago | hide | 28 comments
    // 19.
    // Debian reproducibility statistics (reproducible-builds.org)
    // 157 points by lamby 9 hours ago | hide | 63 comments
    // 20.
    // The Scotsmen Who Invented Modernity (nationalinterest.org)
    // 34 points by pepys 3 hours ago | hide | 3 comments
    // 21.
    // Deterministic Browser (arxiv.org)
    // 34 points by lainon 4 hours ago | hide | 1 comment
    // 22.
    // Deep Learning for Siri’s Voice (apple.com)
    // 168 points by Yossi_Frenkel 9 hours ago | hide | 54 comments
    // 23.
    // I'm giving up on HPKP (scotthelme.co.uk)
    // 95 points by el_duderino 8 hours ago | hide | 58 comments
    // 24.
    // Introducing App Engine Firewall (googleblog.com)
    // 77 points by artsandsci 6 hours ago | hide | 25 comments
    // 25.
    // Detailed study of fatalities and litigation involving police use of stun guns (reuters.com)
    // 52 points by hownottowrite 6 hours ago | hide | 31 comments
    // 26.
    // Why it’s healthy to take a break from your online persona (2016) (theguardian.com)
    // 33 points by Tomte 5 hours ago | hide | 7 comments
    // 27.
    // Profiling Internet Users in Africa: Insights from the Google Play Store (afridigest.com)
    // 29 points by prance 5 hours ago | hide | 1 comment
    // 28.
    // Turing.jl: A Fresh Approach to Probabilistic Programming in Julia (turing.guru)
    // 79 points by indescions_2017 8 hours ago | hide | 10 comments
    // 29.
    // GCC tiny (thinkingeek.com)
    // 89 points by ingve 9 hours ago | hide | 11 comments
    // 30.   Tesorio is hiring engineers and a product designer to modernize finance teams (tesorio.com)
    // 3 hours ago | hide
  ],
  comments: [
    {
      comments: [],
      creationTime: now - 10_000,
      id: 15289630,
      parent: 1,
      submitterId: 'megous',
      text: 'It is part of it in this case. You&#x27;ve just eliminated most of non-targeted scanners. Your log is much more readable and what is left will probably be dedicated attackers.<p>This might help in forensic investigation afterwards. Less crap to wade through.',
      type: 'comment',
      upvotes: new Set(),
    },
    {
      comments: [15290063],
      creationTime: now - 30_000,
      id: 15289567,
      parent: 1,
      submitterId: 'NeutronBoy',
      text: '&gt; Security through obscurity is not the solution, though<p>Security is about layers. Nothing is foolproof. It&#x27;s about implementing layers of controls to reduce your attack surface to an acceptable level, with the trade-off that many controls increase the complexity of your setup or compromises the convenience for your users.<p>For example, for SSH, this probably includes<p>* changing the default port<p>* enforcing SSH key authentication<p>* enforcing passwords on SSH keys<p>* implementing fail2ban<p>* installing jump hosts for internal machines<p>* implementing a VPN rather than external facing hosts (and with that comes all the additional layers for the VPN)<p>* etc...',
      type: 'comment',
      upvotes: new Set(),
    },
    {
      comments: [],
      creationTime: now - 50_000,
      id: 123331,
      parent: 1,
      submitterId: 'mmargerum',
      text: 'Nice post! \r\n Question for you -- what are the performance implications of "re-keying" my records during the transform? Should I try to keep the same key for my transformed record as from my original record so that they align with the same partitions, or are they likely going to get sent to different partitions across different brokers anyway?',
      type: 'comment',
      upvotes: new Set(),
    },
    {
      comments: [],
      creationTime: now - 70_000,
      id: 123331,
      parent: 1,
      submitterId: 'pgwhalen',
      text: 'Vue/React/Svelte are pretty damned productive. 1/5 - 1/10th of typical server rendered or native UI LOC. If I never write another line of code directly manipulating UI controls I can die a happy man.',
      type: 'comment',
      upvotes: new Set(),
    },
    {
      comments: [],
      creationTime: now - 90_000,
      id: 123331,
      parent: 1,
      submitterId: 'rererr',
      text: 'Can you be precise about what they knew? Knowing a crash is coming isn’t necessarily that interesting - a crash is always coming, it’s just not clear on what time horizon, or what its secondary effects will be. \r\n JumpCrisscross did make the interesting point that the “bankers were selling crap” narrative about the crisis is often overstated - the real reason that the situation was a crisis was the cascading liquidity issues, not so much defaulting debt.',
      type: 'comment',
      upvotes: new Set(),
    },
    {
      comments: [],
      creationTime: now - 110_000,
      id: 123331,
      parent: 1,
      submitterId: 'reustle',
      text: "The arbitrary exceptions are pretty nice. In an industry I am aware of, people absolutely have to be onsite and also need to eat lunch. When lunch is being eaten in the cafeteria, you got a bunch of maskless people in the same room spread out at least six feet. It's been long established that the virus, particularly the omicron variant, easily spreads at distance. \r\n But those six feet, when blessed by corporate, make all the difference.",
      type: 'comment',
      upvotes: new Set(),
    },
    {
      comments: [],
      creationTime: now - 130_000,
      id: 123331,
      parent: 1,
      submitterId: 'pcurve',
      text: "> At it’s peak MySpace was one or two orders of magnitude smaller than Meta is today. \r\nWhile this may be true, what % of global internet DAUs did each of them house? I'm not sure if this relevant or not, but it seems the internet was just a much smaller place back then.",
      type: 'comment',
      upvotes: new Set(),
    },
    {
      comments: [],
      creationTime: now - 150_000,
      id: 123331,
      parent: 1,
      submitterId: 'zeckalpha',
      text: 'It\'s Jack Welsh playbook and it\'s stupid. I remember reading an interview with a head of company long time and he said something to the effect of "In any given company, top 20% of the workers push the company forward. middle 60% maintains status quo, and bottom 20% of the workers actively drag the company down." Interviewer ask: "why not just fire bottom 20%?" \r\nHis answer: "because, of the remaining, a new bottom 20% will be formed"',
      type: 'comment',
      upvotes: new Set(),
    },
    {
      comments: [],
      creationTime: now - 170_000,
      id: 123331,
      parent: 1,
      submitterId: 'clintonwoo',
      text: 'I know this might come accross as bragging, but I just won the internet again.',
      type: 'comment',
      upvotes: new Set(['clintonwoo', 'john']),
    },
  ],
  users: [
    {
      id: 'clintonwoo', // Aka. username
      about: 'I am a software engineer who lives in New York.',
      creationTime: 1506024614000,
      dateOfBirth: 723618000000,
      email: 'clinton@hotmail.com',
      firstName: 'Clinton',
      hashedPassword: 'abc123',
      hides: [],
      karma: 3,
      lastName: "D'Annolfo",
      likes: [],
      passwordSalt: '123',
      posts: [1222],
    },
    {
      id: 'john', // Aka. username
      about: 'Just a bloke',
      creationTime: 1506024554000,
      dateOfBirth: 554875200000,
      email: 'john@doe.com',
      firstName: 'John',
      hashedPassword: '123',
      hides: [],
      karma: 1,
      lastName: 'Doe',
      likes: [],
      passwordSalt: 'abc',
      posts: [1223],
    },
  ],
};
