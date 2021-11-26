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
