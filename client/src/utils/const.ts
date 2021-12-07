export const regions =
  process.env.NODE_ENV === "development"
    ? [
        "471abc99b378", // 서초동
        "1e652eeb5b91",
        "d25d973fdf1b",
        "9eccb81d1788",
        "cc1856fff005",
        "79f5f58de451",
        "5424e9f7ec6d",
        "2c450d31f107",
        "6a7eefda7865",
        "ee1c4acc500b",
        "798608f67a48",
        "6530459d189b", // 역삼1동
      ]
    : [
        "471abc99b378", // 서초동
        "1e652eeb5b91",
        "d25d973fdf1b",
        "9eccb81d1788",
        "cc1856fff005",
        "79f5f58de451",
        "5424e9f7ec6d",
        "2c450d31f107",
        "6a7eefda7865",
        "ee1c4acc500b",
        "798608f67a48",
      ];

export const regionsGroup =
  process.env.NODE_ENV === "development"
    ? [
        // 서초
        [
          "471abc99b378",
          "1e652eeb5b91",
          "d25d973fdf1b",
          "9eccb81d1788",
          "cc1856fff005",
          "6530459d189b", // 역삼1동
        ],
        // 잠실
        [
          "5424e9f7ec6d",
          "2c450d31f107",
          "6a7eefda7865",
          "ee1c4acc500b",
          "798608f67a48",
        ],
        // 한남
        ["79f5f58de451"],
      ]
    : [
        // 서초
        [
          "471abc99b378",
          "1e652eeb5b91",
          "d25d973fdf1b",
          "9eccb81d1788",
          "cc1856fff005",
        ],
        // 잠실
        [
          "5424e9f7ec6d",
          "2c450d31f107",
          "6a7eefda7865",
          "ee1c4acc500b",
          "798608f67a48",
        ],
        // 한남
        ["79f5f58de451"],
      ];

export const onboardingRegionsGroup = [
  // 봉천동
  ["8b33856acaed"],
  // 성수동
  [
    "b4b44131675a",
    "f6c0f71d22ad",
    "1d5114adb4e1",
    "d1dfdf65c2f4",
    "30dbc232e649",
    "fc19ab750f79",
  ],
  // 을지로동
  [
    "d9fa9866fe4f",
    "326e133787bb",
    "3cad18959bd1",
    "d25c1f892dbe",
    "b1d7641abcbf",
    "0ec56241ac2d",
    "fdbceeb0f52c",
    "0c9ddf56c150",
    "006de273faf2",
    "786982f8b35f",
    "ae3e5e45df0a",
  ],
  // 연희동
  ["f41c789605e4"],
  // 연남동
  ["b479c088a68d"],
  // 신촌동
  ["7dfec777e1b5"],
];
