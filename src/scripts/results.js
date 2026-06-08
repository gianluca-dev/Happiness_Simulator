import { simState } from './main.js';

const resultsConfig = {
    whr: {
        2019: [
            { rank: 1,   nation: 'Finnland',                 score: 7.809 },
            { rank: 2,   nation: 'Dänemark',                 score: 7.646 },
            { rank: 3,   nation: 'Schweiz',                  score: 7.560 },
            { rank: 4,   nation: 'Island',                   score: 7.504 },
            { rank: 5,   nation: 'Norwegen',                 score: 7.488 },
            { rank: 6,   nation: 'Niederlande',              score: 7.449 },
            { rank: 7,   nation: 'Schweden',                 score: 7.353 },
            { rank: 8,   nation: 'Neuseeland',               score: 7.300 },
            { rank: 9,   nation: 'Österreich',               score: 7.294 },
            { rank: 10,  nation: 'Luxemburg',                score: 7.238 },
            { rank: 11,  nation: 'Kanada',                   score: 7.232 },
            { rank: 12,  nation: 'Australien',               score: 7.223 },
            { rank: 13,  nation: 'Großbritannien',           score: 7.165 },
            { rank: 14,  nation: 'Israel',                   score: 7.129 },
            { rank: 15,  nation: 'Costa Rica',               score: 7.121 },
            { rank: 16,  nation: 'Irland',                   score: 7.094 },
            { rank: 17,  nation: 'Deutschland',              score: 7.076 },
            { rank: 18,  nation: 'USA',                      score: 6.940 },
            { rank: 19,  nation: 'Tschechien',               score: 6.911 },
            { rank: 20,  nation: 'Belgien',                  score: 6.864 },
            { rank: 21,  nation: 'Ver. Arab. Emirate',       score: 6.791 },
            { rank: 22,  nation: 'Malta',                    score: 6.773 },
            { rank: 23,  nation: 'Frankreich',               score: 6.664 },
            { rank: 24,  nation: 'Mexiko',                   score: 6.465 },
            { rank: 25,  nation: 'Taiwan',                   score: 6.455 },
            { rank: 26,  nation: 'Uruguay',                  score: 6.440 },
            { rank: 27,  nation: 'Saudi-Arabien',            score: 6.406 },
            { rank: 28,  nation: 'Spanien',                  score: 6.401 },
            { rank: 29,  nation: 'Guatemala',                score: 6.399 },
            { rank: 30,  nation: 'Italien',                  score: 6.387 },
            { rank: 31,  nation: 'Singapur',                 score: 6.377 },
            { rank: 32,  nation: 'Brasilien',                score: 6.376 },
            { rank: 33,  nation: 'Slowenien',                score: 6.363 },
            { rank: 34,  nation: 'El Salvador',              score: 6.348 },
            { rank: 35,  nation: 'Kosovo',                   score: 6.325 },
            { rank: 36,  nation: 'Panama',                   score: 6.305 },
            { rank: 37,  nation: 'Slowakei',                 score: 6.281 },
            { rank: 38,  nation: 'Usbekistan',               score: 6.258 },
            { rank: 39,  nation: 'Chile',                    score: 6.228 },
            { rank: 40,  nation: 'Bahrain',                  score: 6.227 },
            { rank: 41,  nation: 'Litauen',                  score: 6.215 },
            { rank: 42,  nation: 'Trinidad und Tobago',      score: 6.192 },
            { rank: 43,  nation: 'Polen',                    score: 6.186 },
            { rank: 44,  nation: 'Kolumbien',                score: 6.163 },
            { rank: 45,  nation: 'Zypern',                   score: 6.159 },
            { rank: 46,  nation: 'Nicaragua',                score: 6.137 },
            { rank: 47,  nation: 'Rumänien',                 score: 6.124 },
            { rank: 48,  nation: 'Kuwait',                   score: 6.102 },
            { rank: 49,  nation: 'Mauritius',                score: 6.101 },
            { rank: 50,  nation: 'Kasachstan',               score: 6.058 },
            { rank: 51,  nation: 'Estland',                  score: 6.022 },
            { rank: 52,  nation: 'Philippinen',              score: 6.006 },
            { rank: 53,  nation: 'Ungarn',                   score: 6.000 },
            { rank: 54,  nation: 'Thailand',                 score: 5.999 },
            { rank: 55,  nation: 'Argentinien',              score: 5.975 },
            { rank: 56,  nation: 'Honduras',                 score: 5.953 },
            { rank: 57,  nation: 'Lettland',                 score: 5.950 },
            { rank: 58,  nation: 'Ecuador',                  score: 5.925 },
            { rank: 59,  nation: 'Portugal',                 score: 5.911 },
            { rank: 60,  nation: 'Jamaika',                  score: 5.890 },
            { rank: 61,  nation: 'Südkorea',                 score: 5.872 },
            { rank: 62,  nation: 'Japan',                    score: 5.871 },
            { rank: 63,  nation: 'Peru',                     score: 5.797 },
            { rank: 64,  nation: 'Serbien',                  score: 5.778 },
            { rank: 65,  nation: 'Bolivien',                 score: 5.747 },
            { rank: 66,  nation: 'Pakistan',                 score: 5.693 },
            { rank: 67,  nation: 'Paraguay',                 score: 5.692 },
            { rank: 68,  nation: 'Dominikan. Republik',      score: 5.689 },
            { rank: 69,  nation: 'Bosnien-Herzegowina',      score: 5.674 },
            { rank: 70,  nation: 'Moldau',                   score: 5.608 },
            { rank: 71,  nation: 'Tadschikistan',            score: 5.556 },
            { rank: 72,  nation: 'Montenegro',               score: 5.546 },
            { rank: 73,  nation: 'Russland',                 score: 5.546 },
            { rank: 74,  nation: 'Kirgisistan',              score: 5.542 },
            { rank: 75,  nation: 'Belarus',                  score: 5.540 },
            { rank: 76,  nation: 'Nordzypern',               score: 5.536 },
            { rank: 77,  nation: 'Griechenland',             score: 5.515 },
            { rank: 78,  nation: 'Hongkong',                 score: 5.510 },
            { rank: 79,  nation: 'Kroatien',                 score: 5.505 },
            { rank: 80,  nation: 'Libyen',                   score: 5.489 },
            { rank: 81,  nation: 'Mongolei',                 score: 5.456 },
            { rank: 82,  nation: 'Malaysia',                 score: 5.384 },
            { rank: 83,  nation: 'Vietnam',                  score: 5.353 },
            { rank: 84,  nation: 'Indonesien',               score: 5.286 },
            { rank: 85,  nation: 'Elfenbeinküste',           score: 5.233 },
            { rank: 86,  nation: 'Benin',                    score: 5.216 },
            { rank: 87,  nation: 'Malediven',                score: 5.198 },
            { rank: 88,  nation: 'Kongo',                    score: 5.194 },
            { rank: 89,  nation: 'Aserbaidschan',            score: 5.165 },
            { rank: 90,  nation: 'Nordmazedonien',           score: 5.160 },
            { rank: 91,  nation: 'Ghana',                    score: 5.148 },
            { rank: 92,  nation: 'Nepal',                    score: 5.137 },
            { rank: 93,  nation: 'Türkei',                   score: 5.132 },
            { rank: 94,  nation: 'China',                    score: 5.124 },
            { rank: 95,  nation: 'Turkmenistan',             score: 5.119 },
            { rank: 96,  nation: 'Bulgarien',                score: 5.102 },
            { rank: 97,  nation: 'Marokko',                  score: 5.095 },
            { rank: 98,  nation: 'Kamerun',                  score: 5.085 },
            { rank: 99,  nation: 'Venezuela',                score: 5.053 },
            { rank: 100, nation: 'Algerien',                 score: 5.005 },
            { rank: 101, nation: 'Senegal',                  score: 4.981 },
            { rank: 102, nation: 'Guinea',                   score: 4.949 },
            { rank: 103, nation: 'Niger',                    score: 4.910 },
            { rank: 104, nation: 'Laos',                     score: 4.889 },
            { rank: 105, nation: 'Albanien',                 score: 4.883 },
            { rank: 106, nation: 'Kambodscha',               score: 4.848 },
            { rank: 107, nation: 'Bangladesch',              score: 4.833 },
            { rank: 108, nation: 'Gabun',                    score: 4.829 },
            { rank: 109, nation: 'Südafrika',                score: 4.814 },
            { rank: 110, nation: 'Irak',                     score: 4.785 },
            { rank: 111, nation: 'Libanon',                  score: 4.772 },
            { rank: 112, nation: 'Burkina Faso',             score: 4.769 },
            { rank: 113, nation: 'Gambia',                   score: 4.751 },
            { rank: 114, nation: 'Mali',                     score: 4.729 },
            { rank: 115, nation: 'Nigeria',                  score: 4.724 },
            { rank: 116, nation: 'Armenien',                 score: 4.677 },
            { rank: 117, nation: 'Georgien',                 score: 4.673 },
            { rank: 118, nation: 'Iran',                     score: 4.672 },
            { rank: 119, nation: 'Jordanien',                score: 4.633 },
            { rank: 120, nation: 'Mosambik',                 score: 4.624 },
            { rank: 121, nation: 'Kenia',                    score: 4.583 },
            { rank: 122, nation: 'Namibia',                  score: 4.571 },
            { rank: 123, nation: 'Ukraine',                  score: 4.561 },
            { rank: 124, nation: 'Liberia',                  score: 4.558 },
            { rank: 125, nation: 'Palästina',                score: 4.553 },
            { rank: 126, nation: 'Uganda',                   score: 4.432 },
            { rank: 127, nation: 'Tschad',                   score: 4.423 },
            { rank: 128, nation: 'Tunesien',                 score: 4.392 },
            { rank: 129, nation: 'Mauretanien',              score: 4.375 },
            { rank: 130, nation: 'Sri Lanka',                score: 4.327 },
            { rank: 131, nation: 'DR Kongo',                 score: 4.311 },
            { rank: 132, nation: 'Eswatini',                 score: 4.308 },
            { rank: 133, nation: 'Myanmar',                  score: 4.308 },
            { rank: 134, nation: 'Komoren',                  score: 4.289 },
            { rank: 135, nation: 'Togo',                     score: 4.187 },
            { rank: 136, nation: 'Äthiopien',                score: 4.186 },
            { rank: 137, nation: 'Madagaskar',               score: 4.166 },
            { rank: 138, nation: 'Ägypten',                  score: 4.151 },
            { rank: 139, nation: 'Sierra Leone',             score: 3.926 },
            { rank: 140, nation: 'Burundi',                  score: 3.775 },
            { rank: 141, nation: 'Sambia',                   score: 3.759 },
            { rank: 142, nation: 'Haiti',                    score: 3.721 },
            { rank: 143, nation: 'Lesotho',                  score: 3.653 },
            { rank: 144, nation: 'Indien',                   score: 3.573 },
            { rank: 145, nation: 'Malawi',                   score: 3.538 },
            { rank: 146, nation: 'Jemen',                    score: 3.527 },
            { rank: 147, nation: 'Botswana',                 score: 3.479 },
            { rank: 148, nation: 'Tansania',                 score: 3.476 },
            { rank: 149, nation: 'Zentralafrikan. Republik', score: 3.476 },
            { rank: 150, nation: 'Ruanda',                   score: 3.312 },
            { rank: 151, nation: 'Simbabwe',                 score: 3.299 },
            { rank: 152, nation: 'Südsudan',                 score: 2.817 },
            { rank: 153, nation: 'Afghanistan',              score: 2.567 },
        ],
        2020: [
            { rank: 1,   nation: 'Finnland',            score: 7.842 },
            { rank: 2,   nation: 'Dänemark',            score: 7.620 },
            { rank: 3,   nation: 'Schweiz',             score: 7.571 },
            { rank: 4,   nation: 'Island',              score: 7.554 },
            { rank: 5,   nation: 'Niederlande',         score: 7.464 },
            { rank: 6,   nation: 'Norwegen',            score: 7.392 },
            { rank: 7,   nation: 'Schweden',            score: 7.363 },
            { rank: 8,   nation: 'Luxemburg',           score: 7.324 },
            { rank: 9,   nation: 'Neuseeland',          score: 7.277 },
            { rank: 10,  nation: 'Österreich',          score: 7.268 },
            { rank: 11,  nation: 'Australien',          score: 7.183 },
            { rank: 12,  nation: 'Israel',              score: 7.157 },
            { rank: 13,  nation: 'Deutschland',         score: 7.155 },
            { rank: 14,  nation: 'Kanada',              score: 7.103 },
            { rank: 15,  nation: 'Irland',              score: 7.085 },
            { rank: 16,  nation: 'Costa Rica',          score: 7.069 },
            { rank: 17,  nation: 'Großbritannien',      score: 7.064 },
            { rank: 18,  nation: 'Tschechien',          score: 6.965 },
            { rank: 19,  nation: 'USA',                 score: 6.951 },
            { rank: 20,  nation: 'Belgien',             score: 6.834 },
            { rank: 21,  nation: 'Frankreich',          score: 6.690 },
            { rank: 22,  nation: 'Bahrain',             score: 6.647 },
            { rank: 23,  nation: 'Malta',               score: 6.602 },
            { rank: 24,  nation: 'Taiwan',              score: 6.584 },
            { rank: 25,  nation: 'Ver. Arab. Emirate',  score: 6.561 },
            { rank: 26,  nation: 'Saudi-Arabien',       score: 6.494 },
            { rank: 27,  nation: 'Spanien',             score: 6.491 },
            { rank: 28,  nation: 'Italien',             score: 6.483 },
            { rank: 29,  nation: 'Slowenien',           score: 6.461 },
            { rank: 30,  nation: 'Guatemala',           score: 6.435 },
            { rank: 31,  nation: 'Uruguay',             score: 6.431 },
            { rank: 32,  nation: 'Singapur',            score: 6.377 },
            { rank: 33,  nation: 'Kosovo',              score: 6.372 },
            { rank: 34,  nation: 'Slowakei',            score: 6.331 },
            { rank: 35,  nation: 'Brasilien',           score: 6.330 },
            { rank: 36,  nation: 'Mexiko',              score: 6.317 },
            { rank: 37,  nation: 'Jamaika',             score: 6.309 },
            { rank: 38,  nation: 'Litauen',             score: 6.255 },
            { rank: 39,  nation: 'Zypern',              score: 6.223 },
            { rank: 40,  nation: 'Estland',             score: 6.189 },
            { rank: 41,  nation: 'Panama',              score: 6.180 },
            { rank: 42,  nation: 'Usbekistan',          score: 6.179 },
            { rank: 43,  nation: 'Chile',               score: 6.172 },
            { rank: 44,  nation: 'Polen',               score: 6.166 },
            { rank: 45,  nation: 'Kasachstan',          score: 6.152 },
            { rank: 46,  nation: 'Rumänien',            score: 6.140 },
            { rank: 47,  nation: 'Kuwait',              score: 6.106 },
            { rank: 48,  nation: 'Serbien',             score: 6.078 },
            { rank: 49,  nation: 'El Salvador',         score: 6.061 },
            { rank: 50,  nation: 'Mauritius',           score: 6.049 },
            { rank: 51,  nation: 'Lettland',            score: 6.032 },
            { rank: 52,  nation: 'Kolumbien',           score: 6.012 },
            { rank: 53,  nation: 'Ungarn',              score: 5.992 },
            { rank: 54,  nation: 'Thailand',            score: 5.985 },
            { rank: 55,  nation: 'Nicaragua',           score: 5.972 },
            { rank: 56,  nation: 'Japan',               score: 5.940 },
            { rank: 57,  nation: 'Argentinien',         score: 5.929 },
            { rank: 58,  nation: 'Portugal',            score: 5.929 },
            { rank: 59,  nation: 'Honduras',            score: 5.919 },
            { rank: 60,  nation: 'Kroatien',            score: 5.882 },
            { rank: 61,  nation: 'Philippinen',         score: 5.880 },
            { rank: 62,  nation: 'Südkorea',            score: 5.845 },
            { rank: 63,  nation: 'Peru',                score: 5.840 },
            { rank: 64,  nation: 'Bosnien-Herzegowina', score: 5.813 },
            { rank: 65,  nation: 'Moldau',              score: 5.766 },
            { rank: 66,  nation: 'Ecuador',             score: 5.764 },
            { rank: 67,  nation: 'Kirgisistan',         score: 5.744 },
            { rank: 68,  nation: 'Griechenland',        score: 5.723 },
            { rank: 69,  nation: 'Bolivien',            score: 5.716 },
            { rank: 70,  nation: 'Mongolei',            score: 5.677 },
            { rank: 71,  nation: 'Paraguay',            score: 5.653 },
            { rank: 72,  nation: 'Montenegro',          score: 5.581 },
            { rank: 73,  nation: 'Dominikan. Republik', score: 5.545 },
            { rank: 74,  nation: 'Nordzypern',          score: 5.536 },
            { rank: 75,  nation: 'Belarus',             score: 5.534 },
            { rank: 76,  nation: 'Russland',            score: 5.477 },
            { rank: 77,  nation: 'Hongkong',            score: 5.477 },
            { rank: 78,  nation: 'Tadschikistan',       score: 5.466 },
            { rank: 79,  nation: 'Vietnam',             score: 5.411 },
            { rank: 80,  nation: 'Libyen',              score: 5.410 },
            { rank: 81,  nation: 'Malaysia',            score: 5.384 },
            { rank: 82,  nation: 'Indonesien',          score: 5.345 },
            { rank: 83,  nation: 'Kongo',               score: 5.342 },
            { rank: 84,  nation: 'China',               score: 5.339 },
            { rank: 85,  nation: 'Elfenbeinküste',      score: 5.306 },
            { rank: 86,  nation: 'Armenien',            score: 5.283 },
            { rank: 87,  nation: 'Nepal',               score: 5.269 },
            { rank: 88,  nation: 'Bulgarien',           score: 5.266 },
            { rank: 89,  nation: 'Malediven',           score: 5.198 },
            { rank: 90,  nation: 'Aserbaidschan',       score: 5.171 },
            { rank: 91,  nation: 'Kamerun',             score: 5.142 },
            { rank: 92,  nation: 'Senegal',             score: 5.132 },
            { rank: 93,  nation: 'Albanien',            score: 5.117 },
            { rank: 94,  nation: 'Nordmazedonien',      score: 5.101 },
            { rank: 95,  nation: 'Ghana',               score: 5.088 },
            { rank: 96,  nation: 'Niger',               score: 5.074 },
            { rank: 97,  nation: 'Turkmenistan',        score: 5.066 },
            { rank: 98,  nation: 'Gambia',              score: 5.051 },
            { rank: 99,  nation: 'Benin',               score: 5.045 },
            { rank: 100, nation: 'Laos',                score: 5.030 },
            { rank: 101, nation: 'Bangladesch',         score: 5.025 },
            { rank: 102, nation: 'Guinea',              score: 4.984 },
            { rank: 103, nation: 'Südafrika',           score: 4.956 },
            { rank: 104, nation: 'Türkei',              score: 4.948 },
            { rank: 105, nation: 'Pakistan',            score: 4.934 },
            { rank: 106, nation: 'Marokko',             score: 4.918 },
            { rank: 107, nation: 'Venezuela',           score: 4.892 },
            { rank: 108, nation: 'Georgien',            score: 4.891 },
            { rank: 109, nation: 'Algerien',            score: 4.887 },
            { rank: 110, nation: 'Ukraine',             score: 4.875 },
            { rank: 111, nation: 'Irak',                score: 4.854 },
            { rank: 112, nation: 'Gabun',               score: 4.852 },
            { rank: 113, nation: 'Burkina Faso',        score: 4.834 },
            { rank: 114, nation: 'Kambodscha',          score: 4.830 },
            { rank: 115, nation: 'Mosambik',            score: 4.794 },
            { rank: 116, nation: 'Nigeria',             score: 4.759 },
            { rank: 117, nation: 'Mali',                score: 4.723 },
            { rank: 118, nation: 'Iran',                score: 4.721 },
            { rank: 119, nation: 'Uganda',              score: 4.636 },
            { rank: 120, nation: 'Liberia',             score: 4.625 },
            { rank: 121, nation: 'Kenia',               score: 4.607 },
            { rank: 122, nation: 'Tunesien',            score: 4.596 },
            { rank: 123, nation: 'Libanon',             score: 4.584 },
            { rank: 124, nation: 'Namibia',             score: 4.574 },
            { rank: 125, nation: 'Palästina',           score: 4.517 },
            { rank: 126, nation: 'Myanmar',             score: 4.426 },
            { rank: 127, nation: 'Jordanien',           score: 4.395 },
            { rank: 128, nation: 'Tschad',              score: 4.355 },
            { rank: 129, nation: 'Sri Lanka',           score: 4.325 },
            { rank: 130, nation: 'Eswatini',            score: 4.308 },
            { rank: 131, nation: 'Komoren',             score: 4.289 },
            { rank: 132, nation: 'Ägypten',             score: 4.283 },
            { rank: 133, nation: 'Äthiopien',           score: 4.275 },
            { rank: 134, nation: 'Mauretanien',         score: 4.227 },
            { rank: 135, nation: 'Madagaskar',          score: 4.208 },
            { rank: 136, nation: 'Togo',                score: 4.107 },
            { rank: 137, nation: 'Sambia',              score: 4.073 },
            { rank: 138, nation: 'Sierra Leone',        score: 3.849 },
            { rank: 139, nation: 'Indien',              score: 3.819 },
            { rank: 140, nation: 'Burundi',             score: 3.775 },
            { rank: 141, nation: 'Jemen',               score: 3.658 },
            { rank: 142, nation: 'Tansania',            score: 3.623 },
            { rank: 143, nation: 'Haiti',               score: 3.615 },
            { rank: 144, nation: 'Malawi',              score: 3.600 },
            { rank: 145, nation: 'Lesotho',             score: 3.512 },
            { rank: 146, nation: 'Botswana',            score: 3.467 },
            { rank: 147, nation: 'Ruanda',              score: 3.415 },
            { rank: 148, nation: 'Simbabwe',            score: 3.145 },
            { rank: 149, nation: 'Afghanistan',         score: 2.523 },
        ],
        2021: [
            { rank: 1,   nation: 'Finnland',            score: 7.821 },
            { rank: 2,   nation: 'Dänemark',            score: 7.636 },
            { rank: 3,   nation: 'Island',              score: 7.557 },
            { rank: 4,   nation: 'Schweiz',             score: 7.512 },
            { rank: 5,   nation: 'Niederlande',         score: 7.415 },
            { rank: 6,   nation: 'Luxemburg',           score: 7.404 },
            { rank: 7,   nation: 'Schweden',            score: 7.384 },
            { rank: 8,   nation: 'Norwegen',            score: 7.365 },
            { rank: 9,   nation: 'Israel',              score: 7.364 },
            { rank: 10,  nation: 'Neuseeland',          score: 7.200 },
            { rank: 11,  nation: 'Österreich',          score: 7.163 },
            { rank: 12,  nation: 'Australien',          score: 7.162 },
            { rank: 13,  nation: 'Irland',              score: 7.041 },
            { rank: 14,  nation: 'Deutschland',         score: 7.034 },
            { rank: 15,  nation: 'Kanada',              score: 7.025 },
            { rank: 16,  nation: 'USA',                 score: 6.977 },
            { rank: 17,  nation: 'Großbritannien',      score: 6.943 },
            { rank: 18,  nation: 'Tschechien',          score: 6.920 },
            { rank: 19,  nation: 'Belgien',             score: 6.805 },
            { rank: 20,  nation: 'Frankreich',          score: 6.687 },
            { rank: 21,  nation: 'Bahrain',             score: 6.647 },
            { rank: 22,  nation: 'Slowenien',           score: 6.630 },
            { rank: 23,  nation: 'Costa Rica',          score: 6.582 },
            { rank: 24,  nation: 'Ver. Arab. Emirate',  score: 6.576 },
            { rank: 25,  nation: 'Saudi-Arabien',       score: 6.523 },
            { rank: 26,  nation: 'Taiwan',              score: 6.512 },
            { rank: 27,  nation: 'Singapur',            score: 6.480 },
            { rank: 28,  nation: 'Rumänien',            score: 6.477 },
            { rank: 29,  nation: 'Spanien',             score: 6.476 },
            { rank: 30,  nation: 'Uruguay',             score: 6.474 },
            { rank: 31,  nation: 'Italien',             score: 6.467 },
            { rank: 32,  nation: 'Kosovo',              score: 6.455 },
            { rank: 33,  nation: 'Malta',               score: 6.447 },
            { rank: 34,  nation: 'Litauen',             score: 6.446 },
            { rank: 35,  nation: 'Slowakei',            score: 6.391 },
            { rank: 36,  nation: 'Estland',             score: 6.341 },
            { rank: 37,  nation: 'Panama',              score: 6.309 },
            { rank: 38,  nation: 'Brasilien',           score: 6.293 },
            { rank: 39,  nation: 'Guatemala',           score: 6.262 },
            { rank: 40,  nation: 'Kasachstan',          score: 6.234 },
            { rank: 41,  nation: 'Zypern',              score: 6.221 },
            { rank: 42,  nation: 'Lettland',            score: 6.180 },
            { rank: 43,  nation: 'Serbien',             score: 6.178 },
            { rank: 44,  nation: 'Chile',               score: 6.172 },
            { rank: 45,  nation: 'Nicaragua',           score: 6.165 },
            { rank: 46,  nation: 'Mexiko',              score: 6.128 },
            { rank: 47,  nation: 'Kroatien',            score: 6.125 },
            { rank: 48,  nation: 'Polen',               score: 6.123 },
            { rank: 49,  nation: 'El Salvador',         score: 6.120 },
            { rank: 50,  nation: 'Kuwait',              score: 6.106 },
            { rank: 51,  nation: 'Ungarn',              score: 6.086 },
            { rank: 52,  nation: 'Mauritius',           score: 6.071 },
            { rank: 53,  nation: 'Usbekistan',          score: 6.063 },
            { rank: 54,  nation: 'Japan',               score: 6.039 },
            { rank: 55,  nation: 'Honduras',            score: 6.022 },
            { rank: 56,  nation: 'Portugal',            score: 6.016 },
            { rank: 57,  nation: 'Argentinien',         score: 5.967 },
            { rank: 58,  nation: 'Griechenland',        score: 5.948 },
            { rank: 59,  nation: 'Südkorea',            score: 5.935 },
            { rank: 60,  nation: 'Philippinen',         score: 5.904 },
            { rank: 61,  nation: 'Thailand',            score: 5.891 },
            { rank: 62,  nation: 'Moldau',              score: 5.857 },
            { rank: 63,  nation: 'Jamaika',             score: 5.850 },
            { rank: 64,  nation: 'Kirgisistan',         score: 5.828 },
            { rank: 65,  nation: 'Belarus',             score: 5.821 },
            { rank: 66,  nation: 'Kolumbien',           score: 5.781 },
            { rank: 67,  nation: 'Bosnien-Herzegowina', score: 5.768 },
            { rank: 68,  nation: 'Mongolei',            score: 5.761 },
            { rank: 69,  nation: 'Dominikan. Republik', score: 5.737 },
            { rank: 70,  nation: 'Malaysia',            score: 5.711 },
            { rank: 71,  nation: 'Bolivien',            score: 5.600 },
            { rank: 72,  nation: 'China',               score: 5.585 },
            { rank: 73,  nation: 'Paraguay',            score: 5.578 },
            { rank: 74,  nation: 'Peru',                score: 5.559 },
            { rank: 75,  nation: 'Montenegro',          score: 5.547 },
            { rank: 76,  nation: 'Ecuador',             score: 5.533 },
            { rank: 77,  nation: 'Vietnam',             score: 5.485 },
            { rank: 78,  nation: 'Turkmenistan',        score: 5.474 },
            { rank: 79,  nation: 'Nordzypern',          score: 5.467 },
            { rank: 80,  nation: 'Russland',            score: 5.459 },
            { rank: 81,  nation: 'Hongkong',            score: 5.425 },
            { rank: 82,  nation: 'Armenien',            score: 5.399 },
            { rank: 83,  nation: 'Tadschikistan',       score: 5.377 },
            { rank: 84,  nation: 'Nepal',               score: 5.377 },
            { rank: 85,  nation: 'Bulgarien',           score: 5.371 },
            { rank: 86,  nation: 'Libyen',              score: 5.330 },
            { rank: 87,  nation: 'Indonesien',          score: 5.240 },
            { rank: 88,  nation: 'Elfenbeinküste',      score: 5.235 },
            { rank: 89,  nation: 'Nordmazedonien',      score: 5.199 },
            { rank: 90,  nation: 'Albanien',            score: 5.199 },
            { rank: 91,  nation: 'Südafrika',           score: 5.194 },
            { rank: 92,  nation: 'Aserbaidschan',       score: 5.173 },
            { rank: 93,  nation: 'Gambia',              score: 5.164 },
            { rank: 94,  nation: 'Bangladesch',         score: 5.155 },
            { rank: 95,  nation: 'Laos',                score: 5.140 },
            { rank: 96,  nation: 'Algerien',            score: 5.122 },
            { rank: 97,  nation: 'Liberia',             score: 5.122 },
            { rank: 98,  nation: 'Ukraine',             score: 5.084 },
            { rank: 99,  nation: 'Kongo',               score: 5.075 },
            { rank: 100, nation: 'Marokko',             score: 5.060 },
            { rank: 101, nation: 'Mosambik',            score: 5.048 },
            { rank: 102, nation: 'Kamerun',             score: 5.048 },
            { rank: 103, nation: 'Senegal',             score: 5.046 },
            { rank: 104, nation: 'Niger',               score: 5.003 },
            { rank: 105, nation: 'Georgien',            score: 4.973 },
            { rank: 106, nation: 'Gabun',               score: 4.958 },
            { rank: 107, nation: 'Irak',                score: 4.941 },
            { rank: 108, nation: 'Venezuela',           score: 4.925 },
            { rank: 109, nation: 'Guinea',              score: 4.891 },
            { rank: 110, nation: 'Iran',                score: 4.888 },
            { rank: 111, nation: 'Ghana',               score: 4.872 },
            { rank: 112, nation: 'Türkei',              score: 4.744 },
            { rank: 113, nation: 'Burkina Faso',        score: 4.670 },
            { rank: 114, nation: 'Kambodscha',          score: 4.640 },
            { rank: 115, nation: 'Benin',               score: 4.623 },
            { rank: 116, nation: 'Komoren',             score: 4.609 },
            { rank: 117, nation: 'Uganda',              score: 4.603 },
            { rank: 118, nation: 'Nigeria',             score: 4.552 },
            { rank: 119, nation: 'Kenia',               score: 4.543 },
            { rank: 120, nation: 'Tunesien',            score: 4.516 },
            { rank: 121, nation: 'Pakistan',            score: 4.516 },
            { rank: 122, nation: 'Palästina',           score: 4.483 },
            { rank: 123, nation: 'Mali',                score: 4.479 },
            { rank: 124, nation: 'Namibia',             score: 4.459 },
            { rank: 125, nation: 'Eswatini',            score: 4.396 },
            { rank: 126, nation: 'Myanmar',             score: 4.394 },
            { rank: 127, nation: 'Sri Lanka',           score: 4.362 },
            { rank: 128, nation: 'Madagaskar',          score: 4.339 },
            { rank: 129, nation: 'Ägypten',             score: 4.288 },
            { rank: 130, nation: 'Tschad',              score: 4.251 },
            { rank: 131, nation: 'Äthiopien',           score: 4.241 },
            { rank: 132, nation: 'Jemen',               score: 4.197 },
            { rank: 133, nation: 'Mauretanien',         score: 4.153 },
            { rank: 134, nation: 'Jordanien',           score: 4.152 },
            { rank: 135, nation: 'Togo',                score: 4.112 },
            { rank: 136, nation: 'Indien',              score: 3.777 },
            { rank: 137, nation: 'Sambia',              score: 3.760 },
            { rank: 138, nation: 'Malawi',              score: 3.750 },
            { rank: 139, nation: 'Tansania',            score: 3.702 },
            { rank: 140, nation: 'Sierra Leone',        score: 3.574 },
            { rank: 141, nation: 'Lesotho',             score: 3.512 },
            { rank: 142, nation: 'Botswana',            score: 3.471 },
            { rank: 143, nation: 'Ruanda',              score: 3.268 },
            { rank: 144, nation: 'Simbabwe',            score: 2.995 },
            { rank: 145, nation: 'Libanon',             score: 2.955 },
            { rank: 146, nation: 'Afghanistan',         score: 2.404 },
        ],
        2022: [
            { rank: 1,   nation: 'Finnland',            score: 7.804 },
            { rank: 2,   nation: 'Dänemark',            score: 7.586 },
            { rank: 3,   nation: 'Island',              score: 7.530 },
            { rank: 4,   nation: 'Israel',              score: 7.473 },
            { rank: 5,   nation: 'Niederlande',         score: 7.403 },
            { rank: 6,   nation: 'Schweden',            score: 7.395 },
            { rank: 7,   nation: 'Norwegen',            score: 7.315 },
            { rank: 8,   nation: 'Schweiz',             score: 7.240 },
            { rank: 9,   nation: 'Luxemburg',           score: 7.228 },
            { rank: 10,  nation: 'Neuseeland',          score: 7.123 },
            { rank: 11,  nation: 'Österreich',          score: 7.097 },
            { rank: 12,  nation: 'Australien',          score: 7.095 },
            { rank: 13,  nation: 'Kanada',              score: 6.961 },
            { rank: 14,  nation: 'Irland',              score: 6.911 },
            { rank: 15,  nation: 'USA',                 score: 6.894 },
            { rank: 16,  nation: 'Deutschland',         score: 6.892 },
            { rank: 17,  nation: 'Belgien',             score: 6.859 },
            { rank: 18,  nation: 'Tschechien',          score: 6.845 },
            { rank: 19,  nation: 'Großbritannien',      score: 6.796 },
            { rank: 20,  nation: 'Litauen',             score: 6.763 },
            { rank: 21,  nation: 'Frankreich',          score: 6.661 },
            { rank: 22,  nation: 'Slowenien',           score: 6.650 },
            { rank: 23,  nation: 'Costa Rica',          score: 6.609 },
            { rank: 24,  nation: 'Rumänien',            score: 6.589 },
            { rank: 25,  nation: 'Singapur',            score: 6.587 },
            { rank: 26,  nation: 'Ver. Arab. Emirate',  score: 6.571 },
            { rank: 27,  nation: 'Taiwan',              score: 6.535 },
            { rank: 28,  nation: 'Uruguay',             score: 6.494 },
            { rank: 29,  nation: 'Slowakei',            score: 6.469 },
            { rank: 30,  nation: 'Saudi-Arabien',       score: 6.463 },
            { rank: 31,  nation: 'Estland',             score: 6.455 },
            { rank: 32,  nation: 'Spanien',             score: 6.436 },
            { rank: 33,  nation: 'Italien',             score: 6.405 },
            { rank: 34,  nation: 'Kosovo',              score: 6.368 },
            { rank: 35,  nation: 'Chile',               score: 6.334 },
            { rank: 36,  nation: 'Mexiko',              score: 6.330 },
            { rank: 37,  nation: 'Malta',               score: 6.300 },
            { rank: 38,  nation: 'Panama',              score: 6.265 },
            { rank: 39,  nation: 'Polen',               score: 6.260 },
            { rank: 40,  nation: 'Nicaragua',           score: 6.259 },
            { rank: 41,  nation: 'Lettland',            score: 6.213 },
            { rank: 42,  nation: 'Bahrain',             score: 6.173 },
            { rank: 43,  nation: 'Guatemala',           score: 6.150 },
            { rank: 44,  nation: 'Kasachstan',          score: 6.144 },
            { rank: 45,  nation: 'Serbien',             score: 6.144 },
            { rank: 46,  nation: 'Zypern',              score: 6.130 },
            { rank: 47,  nation: 'Japan',               score: 6.129 },
            { rank: 48,  nation: 'Kroatien',            score: 6.125 },
            { rank: 49,  nation: 'Brasilien',           score: 6.125 },
            { rank: 50,  nation: 'El Salvador',         score: 6.122 },
            { rank: 51,  nation: 'Ungarn',              score: 6.041 },
            { rank: 52,  nation: 'Argentinien',         score: 6.024 },
            { rank: 53,  nation: 'Honduras',            score: 6.023 },
            { rank: 54,  nation: 'Usbekistan',          score: 6.014 },
            { rank: 55,  nation: 'Malaysia',            score: 6.012 },
            { rank: 56,  nation: 'Portugal',            score: 5.968 },
            { rank: 57,  nation: 'Südkorea',            score: 5.951 },
            { rank: 58,  nation: 'Griechenland',        score: 5.931 },
            { rank: 59,  nation: 'Mauritius',           score: 5.902 },
            { rank: 60,  nation: 'Thailand',            score: 5.843 },
            { rank: 61,  nation: 'Mongolei',            score: 5.840 },
            { rank: 62,  nation: 'Kirgisistan',         score: 5.825 },
            { rank: 63,  nation: 'Moldau',              score: 5.819 },
            { rank: 64,  nation: 'China',               score: 5.818 },
            { rank: 65,  nation: 'Vietnam',             score: 5.763 },
            { rank: 66,  nation: 'Paraguay',            score: 5.738 },
            { rank: 67,  nation: 'Montenegro',          score: 5.722 },
            { rank: 68,  nation: 'Jamaika',             score: 5.703 },
            { rank: 69,  nation: 'Bolivien',            score: 5.684 },
            { rank: 70,  nation: 'Russland',            score: 5.661 },
            { rank: 71,  nation: 'Bosnien-Herzegowina', score: 5.633 },
            { rank: 72,  nation: 'Kolumbien',           score: 5.630 },
            { rank: 73,  nation: 'Dominikan. Republik', score: 5.569 },
            { rank: 74,  nation: 'Ecuador',             score: 5.559 },
            { rank: 75,  nation: 'Peru',                score: 5.526 },
            { rank: 76,  nation: 'Philippinen',         score: 5.523 },
            { rank: 77,  nation: 'Bulgarien',           score: 5.466 },
            { rank: 78,  nation: 'Nepal',               score: 5.360 },
            { rank: 79,  nation: 'Armenien',            score: 5.342 },
            { rank: 80,  nation: 'Tadschikistan',       score: 5.330 },
            { rank: 81,  nation: 'Algerien',            score: 5.329 },
            { rank: 82,  nation: 'Hongkong',            score: 5.308 },
            { rank: 83,  nation: 'Albanien',            score: 5.277 },
            { rank: 84,  nation: 'Indonesien',          score: 5.277 },
            { rank: 85,  nation: 'Südafrika',           score: 5.275 },
            { rank: 86,  nation: 'Kongo',               score: 5.267 },
            { rank: 87,  nation: 'Nordmazedonien',      score: 5.254 },
            { rank: 88,  nation: 'Venezuela',           score: 5.211 },
            { rank: 89,  nation: 'Laos',                score: 5.111 },
            { rank: 90,  nation: 'Georgien',            score: 5.109 },
            { rank: 91,  nation: 'Guinea',              score: 5.072 },
            { rank: 92,  nation: 'Ukraine',             score: 5.071 },
            { rank: 93,  nation: 'Elfenbeinküste',      score: 5.053 },
            { rank: 94,  nation: 'Gabun',               score: 5.035 },
            { rank: 95,  nation: 'Nigeria',             score: 4.981 },
            { rank: 96,  nation: 'Kamerun',             score: 4.973 },
            { rank: 97,  nation: 'Mosambik',            score: 4.954 },
            { rank: 98,  nation: 'Irak',                score: 4.941 },
            { rank: 99,  nation: 'Palästina',           score: 4.908 },
            { rank: 100, nation: 'Marokko',             score: 4.903 },
            { rank: 101, nation: 'Iran',                score: 4.876 },
            { rank: 102, nation: 'Senegal',             score: 4.855 },
            { rank: 103, nation: 'Mauretanien',         score: 4.724 },
            { rank: 104, nation: 'Burkina Faso',        score: 4.638 },
            { rank: 105, nation: 'Namibia',             score: 4.631 },
            { rank: 106, nation: 'Türkei',              score: 4.614 },
            { rank: 107, nation: 'Ghana',               score: 4.605 },
            { rank: 108, nation: 'Pakistan',            score: 4.555 },
            { rank: 109, nation: 'Niger',               score: 4.501 },
            { rank: 110, nation: 'Tunesien',            score: 4.497 },
            { rank: 111, nation: 'Kenia',               score: 4.487 },
            { rank: 112, nation: 'Sri Lanka',           score: 4.442 },
            { rank: 113, nation: 'Uganda',              score: 4.432 },
            { rank: 114, nation: 'Tschad',              score: 4.397 },
            { rank: 115, nation: 'Kambodscha',          score: 4.393 },
            { rank: 116, nation: 'Benin',               score: 4.374 },
            { rank: 117, nation: 'Myanmar',             score: 4.372 },
            { rank: 118, nation: 'Bangladesch',         score: 4.282 },
            { rank: 119, nation: 'Gambia',              score: 4.279 },
            { rank: 120, nation: 'Mali',                score: 4.198 },
            { rank: 121, nation: 'Ägypten',             score: 4.170 },
            { rank: 122, nation: 'Togo',                score: 4.137 },
            { rank: 123, nation: 'Jordanien',           score: 4.120 },
            { rank: 124, nation: 'Äthiopien',           score: 4.091 },
            { rank: 125, nation: 'Liberia',             score: 4.042 },
            { rank: 126, nation: 'Indien',              score: 4.036 },
            { rank: 127, nation: 'Madagaskar',          score: 4.019 },
            { rank: 128, nation: 'Sambia',              score: 3.982 },
            { rank: 129, nation: 'Tansania',            score: 3.694 },
            { rank: 130, nation: 'Komoren',             score: 3.545 },
            { rank: 131, nation: 'Malawi',              score: 3.495 },
            { rank: 132, nation: 'Botswana',            score: 3.435 },
            { rank: 133, nation: 'DR Kongo',            score: 3.207 },
            { rank: 134, nation: 'Simbabwe',            score: 3.204 },
            { rank: 135, nation: 'Sierra Leone',        score: 3.138 },
            { rank: 136, nation: 'Libanon',             score: 2.392 },
            { rank: 137, nation: 'Afghanistan',         score: 1.859 },
        ],
        2023: [
            { rank: 1,   nation: 'Finnland',             score: 7.741 },
            { rank: 2,   nation: 'Dänemark',             score: 7.583 },
            { rank: 3,   nation: 'Island',               score: 7.525 },
            { rank: 4,   nation: 'Schweden',             score: 7.344 },
            { rank: 5,   nation: 'Israel',               score: 7.341 },
            { rank: 6,   nation: 'Niederlande',          score: 7.319 },
            { rank: 7,   nation: 'Norwegen',             score: 7.302 },
            { rank: 8,   nation: 'Luxemburg',            score: 7.122 },
            { rank: 9,   nation: 'Schweiz',              score: 7.060 },
            { rank: 10,  nation: 'Australien',           score: 7.057 },
            { rank: 11,  nation: 'Neuseeland',           score: 7.029 },
            { rank: 12,  nation: 'Costa Rica',           score: 6.955 },
            { rank: 13,  nation: 'Kuwait',               score: 6.951 },
            { rank: 14,  nation: 'Österreich',           score: 6.905 },
            { rank: 15,  nation: 'Kanada',               score: 6.900 },
            { rank: 16,  nation: 'Belgien',              score: 6.894 },
            { rank: 17,  nation: 'Irland',               score: 6.838 },
            { rank: 18,  nation: 'Tschechien',           score: 6.822 },
            { rank: 19,  nation: 'Litauen',              score: 6.818 },
            { rank: 20,  nation: 'Großbritannien',       score: 6.749 },
            { rank: 21,  nation: 'Slowenien',            score: 6.743 },
            { rank: 22,  nation: 'Ver. Arab. Emirate',   score: 6.733 },
            { rank: 23,  nation: 'USA',                  score: 6.725 },
            { rank: 24,  nation: 'Deutschland',          score: 6.719 },
            { rank: 25,  nation: 'Mexiko',               score: 6.678 },
            { rank: 26,  nation: 'Uruguay',              score: 6.611 },
            { rank: 27,  nation: 'Frankreich',           score: 6.609 },
            { rank: 28,  nation: 'Saudi-Arabien',        score: 6.594 },
            { rank: 29,  nation: 'Kosovo',               score: 6.561 },
            { rank: 30,  nation: 'Singapur',             score: 6.523 },
            { rank: 31,  nation: 'Taiwan',               score: 6.503 },
            { rank: 32,  nation: 'Rumänien',             score: 6.491 },
            { rank: 33,  nation: 'El Salvador',          score: 6.469 },
            { rank: 34,  nation: 'Estland',              score: 6.448 },
            { rank: 35,  nation: 'Polen',                score: 6.442 },
            { rank: 36,  nation: 'Spanien',              score: 6.421 },
            { rank: 37,  nation: 'Serbien',              score: 6.411 },
            { rank: 38,  nation: 'Chile',                score: 6.360 },
            { rank: 39,  nation: 'Panama',               score: 6.358 },
            { rank: 40,  nation: 'Malta',                score: 6.346 },
            { rank: 41,  nation: 'Italien',              score: 6.324 },
            { rank: 42,  nation: 'Guatemala',            score: 6.287 },
            { rank: 43,  nation: 'Nicaragua',            score: 6.284 },
            { rank: 44,  nation: 'Brasilien',            score: 6.272 },
            { rank: 45,  nation: 'Slowakei',             score: 6.257 },
            { rank: 46,  nation: 'Lettland',             score: 6.234 },
            { rank: 47,  nation: 'Usbekistan',           score: 6.195 },
            { rank: 48,  nation: 'Argentinien',          score: 6.188 },
            { rank: 49,  nation: 'Kasachstan',           score: 6.188 },
            { rank: 50,  nation: 'Zypern',               score: 6.068 },
            { rank: 51,  nation: 'Japan',                score: 6.060 },
            { rank: 52,  nation: 'Südkorea',             score: 6.058 },
            { rank: 53,  nation: 'Philippinen',          score: 6.048 },
            { rank: 54,  nation: 'Vietnam',              score: 6.043 },
            { rank: 55,  nation: 'Portugal',             score: 6.030 },
            { rank: 56,  nation: 'Ungarn',               score: 6.017 },
            { rank: 57,  nation: 'Paraguay',             score: 5.977 },
            { rank: 58,  nation: 'Thailand',             score: 5.976 },
            { rank: 59,  nation: 'Malaysia',             score: 5.975 },
            { rank: 60,  nation: 'China',                score: 5.973 },
            { rank: 61,  nation: 'Honduras',             score: 5.968 },
            { rank: 62,  nation: 'Bahrain',              score: 5.959 },
            { rank: 63,  nation: 'Kroatien',             score: 5.942 },
            { rank: 64,  nation: 'Griechenland',         score: 5.934 },
            { rank: 65,  nation: 'Bosnien-Herzegowina',  score: 5.877 },
            { rank: 66,  nation: 'Libyen',               score: 5.866 },
            { rank: 67,  nation: 'Jamaika',              score: 5.842 },
            { rank: 68,  nation: 'Peru',                 score: 5.841 },
            { rank: 69,  nation: 'Dominikan. Republik',  score: 5.823 },
            { rank: 70,  nation: 'Mauritius',            score: 5.816 },
            { rank: 71,  nation: 'Moldau',               score: 5.816 },
            { rank: 72,  nation: 'Russland',             score: 5.785 },
            { rank: 73,  nation: 'Bolivien',             score: 5.784 },
            { rank: 74,  nation: 'Ecuador',              score: 5.725 },
            { rank: 75,  nation: 'Kirgisistan',          score: 5.714 },
            { rank: 76,  nation: 'Montenegro',           score: 5.707 },
            { rank: 77,  nation: 'Mongolei',             score: 5.696 },
            { rank: 78,  nation: 'Kolumbien',            score: 5.695 },
            { rank: 79,  nation: 'Venezuela',            score: 5.607 },
            { rank: 80,  nation: 'Indonesien',           score: 5.568 },
            { rank: 81,  nation: 'Bulgarien',            score: 5.463 },
            { rank: 82,  nation: 'Armenien',             score: 5.455 },
            { rank: 83,  nation: 'Südafrika',            score: 5.422 },
            { rank: 84,  nation: 'Nordmazedonien',       score: 5.369 },
            { rank: 85,  nation: 'Algerien',             score: 5.364 },
            { rank: 86,  nation: 'Hongkong',             score: 5.316 },
            { rank: 87,  nation: 'Albanien',             score: 5.304 },
            { rank: 88,  nation: 'Tadschikistan',        score: 5.281 },
            { rank: 89,  nation: 'Kongo',                score: 5.221 },
            { rank: 90,  nation: 'Mosambik',             score: 5.216 },
            { rank: 91,  nation: 'Georgien',             score: 5.185 },
            { rank: 92,  nation: 'Irak',                 score: 5.166 },
            { rank: 93,  nation: 'Nepal',                score: 5.158 },
            { rank: 94,  nation: 'Laos',                 score: 5.139 },
            { rank: 95,  nation: 'Gabun',                score: 5.106 },
            { rank: 96,  nation: 'Elfenbeinküste',       score: 5.080 },
            { rank: 97,  nation: 'Guinea',               score: 5.023 },
            { rank: 98,  nation: 'Türkei',               score: 4.975 },
            { rank: 99,  nation: 'Senegal',              score: 4.969 },
            { rank: 100, nation: 'Iran',                 score: 4.923 },
            { rank: 101, nation: 'Aserbaidschan',        score: 4.893 },
            { rank: 102, nation: 'Nigeria',              score: 4.881 },
            { rank: 103, nation: 'Palästina',            score: 4.879 },
            { rank: 104, nation: 'Kamerun',              score: 4.874 },
            { rank: 105, nation: 'Ukraine',              score: 4.873 },
            { rank: 106, nation: 'Namibia',              score: 4.832 },
            { rank: 107, nation: 'Marokko',              score: 4.795 },
            { rank: 108, nation: 'Pakistan',             score: 4.657 },
            { rank: 109, nation: 'Niger',                score: 4.556 },
            { rank: 110, nation: 'Burkina Faso',         score: 4.548 },
            { rank: 111, nation: 'Mauretanien',          score: 4.505 },
            { rank: 112, nation: 'Gambia',               score: 4.485 },
            { rank: 113, nation: 'Tschad',               score: 4.471 },
            { rank: 114, nation: 'Kenia',                score: 4.470 },
            { rank: 115, nation: 'Tunesien',             score: 4.422 },
            { rank: 116, nation: 'Benin',                score: 4.377 },
            { rank: 117, nation: 'Uganda',               score: 4.372 },
            { rank: 118, nation: 'Myanmar',              score: 4.354 },
            { rank: 119, nation: 'Kambodscha',           score: 4.341 },
            { rank: 120, nation: 'Ghana',                score: 4.289 },
            { rank: 121, nation: 'Liberia',              score: 4.269 },
            { rank: 122, nation: 'Mali',                 score: 4.232 },
            { rank: 123, nation: 'Madagaskar',           score: 4.228 },
            { rank: 124, nation: 'Togo',                 score: 4.214 },
            { rank: 125, nation: 'Jordanien',            score: 4.186 },
            { rank: 126, nation: 'Indien',               score: 4.054 },
            { rank: 127, nation: 'Ägypten',              score: 3.977 },
            { rank: 128, nation: 'Sri Lanka',            score: 3.898 },
            { rank: 129, nation: 'Bangladesch',          score: 3.886 },
            { rank: 130, nation: 'Äthiopien',            score: 3.861 },
            { rank: 131, nation: 'Tansania',             score: 3.781 },
            { rank: 132, nation: 'Komoren',              score: 3.566 },
            { rank: 133, nation: 'Jemen',                score: 3.561 },
            { rank: 134, nation: 'Sambia',               score: 3.502 },
            { rank: 135, nation: 'Eswatini',             score: 3.502 },
            { rank: 136, nation: 'Malawi',               score: 3.421 },
            { rank: 137, nation: 'Botswana',             score: 3.383 },
            { rank: 138, nation: 'Simbabwe',             score: 3.341 },
            { rank: 139, nation: 'DR Kongo',             score: 3.295 },
            { rank: 140, nation: 'Sierra Leone',         score: 3.245 },
            { rank: 141, nation: 'Lesotho',              score: 3.186 },
            { rank: 142, nation: 'Libanon',              score: 2.707 },
            { rank: 143, nation: 'Afghanistan',          score: 1.721 },
        ],
    },
    germanyRealScores: {
        2019: 7.076,
        2020: 7.155,
        2021: 7.034,
        2022: 6.892,
        2023: 6.719,
    },
    eventTypes: {
        economic: {label: 'Ökonomisch', color: '#36a2eb'},
        political: {label: 'Politisch', color: '#4bc0c0'},
        social: {label: 'Sozial', color: '#ffcd56'},
        health: {label: 'Gesundheitlich', color: '#ff6384'},
    }
};

// Nations that are displayed around the player (ranking)
const nearbyCount = 2;

export function showResults(simData) {
    if (!document.getElementById('results-overlay')) buildOverlay();
    populateResults(simData);

    document.getElementById('results-overlay').classList.remove('inactive');
    localStorage.setItem('Happiness-Simulator-Results', 'true');
}

function buildOverlay() {
    const overlay = document.createElement('div');
    overlay.className ='results-overlay inactive';
    overlay.id = 'results-overlay';

    overlay.innerHTML = `
        <div class="results-container">
            <!--Results-Header-->
            <div class="results-header">
                <p class="results-title">Auswertung</p>
                <p class="results-subtitle">World Happiness Report · 2019-2023</p>
            </div>
            <!--Results-Grid-->
            <div class="results-grid">
                <!--Results-Averages-->
                <div class="results-card results-card-averages">
                    <p class="results-card-title">Jahresdurchschnitt Deutschland</p>
                    <div class="results-averages" id="results-averages"></div>
                </div>
                <!--Results-Factors-->
                <div class="results-card results-card-factors">
                    <p class="results-card-title">Eingesetzte Maßnahmen</p>
                    <div class="results-factors-wrapper">
                        <canvas id="results-factors-chart">
                            <p>Browser unterstützt kein Canvas!</p>
                        </canvas>
                    </div>
                    <div class="results-factors-legend" id="results-factors-legend"></div>
                </div>
                <!--Results-History-->
                <div class="results-card results-card-chart">
                    <p class="results-card-title">Historische Einordnung</p>
                    <p class="results-card-description">Ihre Kurve vs. reale WHR-Werte</p>
                    <div class="results-chart-wrapper">
                        <canvas id="results-history-chart">
                            <p>Browser unterstützt kein Canvas!</p>
                        </canvas>
                    </div>
                </div>
                <!--Results-WHR-->
                <div class="results-card results-card-whr">
                    <p class="results-card-title">WHR Einordnung</p>
                    <div class="results-whr" id="results-whr"></div>
                </div>
                <!--Results-Rank-->
                <div class="results-card results-card-rank">
                    <p class="results-card-title">Ihre WHR-Platzierung</p>
                    <div class="results-rank" id="results-rank"></div>
                </div>
            </div>
            <button class="results-restart-btn" id="results-restart-btn">Neu starten</button>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('results-restart-btn').addEventListener('click', () => {
        localStorage.removeItem('Happiness-Simulator');
        localStorage.removeItem('Happiness-Simulator-Results');

        window.location.href = 'simulator.html';
    });
}

function populateResults(simData) {
    populateAverages();
    populateHistoryChart();
    populateWHR();
    populateRank();
    populateFactors(simData);
}

//---------- Yearly-Averages ----------//

function populateAverages() {
    const container = document.getElementById('results-averages');
    container.innerHTML = '';

    [2019, 2020, 2021, 2022, 2023].forEach(year => {
        const scores = simState.lifeEvalScores[year];
        if (!scores || scores.length === 0) return;

        const average = scores.reduce((a, b) => a + b, 0) / scores.length;
        const realScore = resultsConfig.germanyRealScores[year];
        const difference = average - realScore;
        const differenceColor = difference >= 0 ? '#14b8a6' : '#ef4444';

        const row = document.createElement('div');
        row.className = 'results-averages-row';
        row.innerHTML = `
            <span class="results-averages-year">${year}</span>
            <div class="results-averages-bar-wrapper">
                <div class="results-averages-bar" style="width: ${(average / 10) * 100}%"></div>
            </div>
            <span class="results-averages-score">${average.toFixed(3)}</span>
            <span class="results-averages-difference" style="color: ${differenceColor}">${difference >= 0 ? '+' : ''}${difference.toFixed(3)}</span>
        `;
        container.appendChild(row);
    });
}

//---------- Historical-CompChart ----------//

let historyChart = null;

function populateHistoryChart() {
    const ctx = document.getElementById('results-history-chart');
    if (!ctx) return;

    const years = [2019, 2020, 2021, 2022, 2023];

    const playerData = years.map(year => {
        const scores = simState.lifeEvalScores[year];
        if (!scores || scores.length === 0) return null;

        return parseFloat((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(3));
    });

    const realData = years.map(year => resultsConfig.germanyRealScores[year]);

    if (historyChart) { historyChart.destroy(); historyChart = null; }

    historyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years.map(String),
            datasets: [
                {
                    label: 'Ihre Werte',
                    data: playerData,
                    borderColor: '#36a2eb',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    tension: 0.3,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: 'Reale WHR-Werte',
                    data: realData,
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.08)',
                    tension: 0.3,
                    fill: false,
                    borderDash: [6, 3],
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { min: 1, max: 10, ticks: { stepSize: 0.5 }, title: { display: true,  text: 'Lebenszufriedenheit' } },
                x: { title: { display: true, text: 'Jahr' } }
            },
            plugins: {
                legend: { display: true, position: 'top' },
                tooltip: { callbacks: { label: item => `${item.dataset.label}: ${item.raw?.toFixed(3)}` } }
            }
        }
    });
}

//---------- WHR-Comp ----------//

function populateWHR() {
    const container = document.getElementById('results-whr');
    const finalScore = getFinalScore();
    const finalYear = getFinalYear();
    const realScore = resultsConfig.germanyRealScores[finalYear];
    const yearList = resultsConfig.whr[finalYear];
    const germanyWHR = yearList.find(entry => entry.nation === 'Deutschland');
    const difference = finalScore - realScore;
    const differenceColor = difference >= 0 ? '#14b8a6' : '#ef4444';
    const beaten = difference >= 0;

    container.innerHTML = `
        <div class="results-whr-row">
            <div class="results-whr-block">
                <p class="results-whr-label">Ihr Endwert</p>
                <p class="results-whr-value">${finalScore.toFixed(3)}</p>
            </div>
            <div class="results-whr-block">
                <p class="results-whr-label">WHR ${finalYear} (real)</p>
                <p class="results-whr-value">${realScore.toFixed(3)}</p>
                <p class="results-whr-sublabel">Platz ${germanyWHR.rank} von ${yearList.length}</p>
            </div>
            <div class="results-whr-block">
                <p class="results-whr-label">Abstand</p>
                <p class="results-whr-value" style="color: ${differenceColor}">${difference >= 0? '+' : ''}${difference.toFixed(3)}</p>
                <p class="results-whr-sublabel">${beaten ? 'Sie haben die Realität übertroffen' : 'Sie liegen unter dem realen Wert'}</p>
            </div>
        </div>
        <p class="results-whr-note">Im echten WHR ${finalYear} lag Deutschland mit einem Wert von ${realScore.toFixed(3)} auf Platz ${germanyWHR.rank}. ${beaten ? `Sie haben diesen Wert um ${difference.toFixed(3)} Punkte übertroffen.` : `Sie lagen ${Math.abs(difference).toFixed(3)} Punkte unterhalb dieses Werts.`}</p>
    `;
}

//---------- Realistic-WHR-Rank ----------//

function populateRank() {
    const container = document.getElementById('results-rank');
    const finalScore = getFinalScore();
    const finalYear = getFinalYear();
    const yearList = resultsConfig.whr[finalYear];

    const aboveCount = yearList.filter(entry => entry.score > finalScore).length;
    const simulatedRank = aboveCount + 1;
    const totalNations = yearList.length;

    let rankLabel;
    
    if (simulatedRank === 1) {
        rankLabel = 'Weltspitze!';
    } else if (simulatedRank <= 5) {
        rankLabel = 'Top 5 weltweit!';
    } else if (simulatedRank <= 10) {
        rankLabel = 'Top 10 weltweit!';
    } else if (simulatedRank <= 25) {
        rankLabel = 'Top 25 weltweit!';
    } else if (simulatedRank <= 50) {
        rankLabel = 'Top 50 weltweit!';
    } else if (simulatedRank <= 100) {
        rankLabel = 'Top 100 weltweit!';
    } else {
        rankLabel = `Platz ${simulatedRank} von ${totalNations}`;
    }

    const nearbyEntries = getNearbyRankings(finalScore, simulatedRank, yearList);
    const allEntries = getAllRankings(finalScore, simulatedRank, yearList);

    container.innerHTML = `
        <div class="results-rank-main">
            <p class="results-rank-number">#${simulatedRank}</p>
            <p class="results-rank-label">${rankLabel}</p>
            <p class="results-rank-score">${finalScore.toFixed(3)} Punkte</p>
        </div>
        <div class="results-rank-list" id="results-rank-list">${nearbyEntries.map(entry => renderRankRow(entry)).join('')}</div>
        <button class="results-rank-expand-btn" id="results-rank-expand-btn">Alle ${totalNations} Nationen anzeigen</button>
        <div class="results-rank-list results-rank-list-full inactive" id="results-rank-list-full">${allEntries.map(entry => renderRankRow(entry)).join('')}</div>
    `;

    document.getElementById('results-rank-expand-btn').addEventListener('click', () => {
        const  btn = document.getElementById('results-rank-expand-btn');
        const fullList = document.getElementById('results-rank-list-full');
        const shortList = document.getElementById('results-rank-list');
        const isExpanded = !fullList.classList.contains('inactive');

        fullList.classList.toggle('inactive', isExpanded);
        shortList.classList.toggle('inactive', !isExpanded);
        btn.textContent = isExpanded ? `Alle ${totalNations} Nationen anzeigen` : 'Weniger anzeigen';
    });
}

function renderRankRow(entry) {
    return `
        <div class="results-rank-row ${entry.isPlayer ? 'results-rank-row-player' : ''}">
            <span class="results-rank-position">#${entry.rank}</span>
            <span class="results-rank-name">${entry.nation}</span>
            <span class="results-rank-value">${entry.score.toFixed(3)}</span>
        </div>
    `;
}

function getNearbyRankings(finalScore, simulatedRank, yearList) {
    const playerEntry = { rank: simulatedRank, nation: 'Deutschland (Sie)', score: finalScore, isPlayer: true };
    const above = yearList.filter(entry => entry.score > finalScore).slice(-nearbyCount);
    const below = yearList.filter(entry => entry.score <= finalScore).slice(0, nearbyCount);

    return [...above, playerEntry, ...below];
}

function getAllRankings(finalScore, simulatedRank, yearList) {
    const playerEntry = { rank: simulatedRank, nation: 'Deutschland (Sie)', score: finalScore, isPlayer: true };
    const result = [];
    let playerInserted = false;

    for (const entry of yearList) {
        if (!playerInserted && entry.score <= finalScore) {
            result.push(playerEntry);
            playerInserted = true;
        }

        result.push(entry);
    }

    if (!playerInserted) result.push(playerEntry);
    return result;
}

//---------- Factor-Diagram ----------//

let factorsChart = null;

function populateFactors(simData) {
    const ctx = document.getElementById('results-factors-chart');
    if (!ctx) return;

    const { eventTypes } = resultsConfig;
    const counts = Object.fromEntries(Object.keys(eventTypes).map(key => [key, 0]));

    simState.activeEffects.forEach(effect => {
        const eventDef = simData.events.find(event => event.effect === effect.effect);
        if (eventDef && counts[eventDef.type] !== undefined) counts[eventDef.type]++;
    });

    const entries = Object.entries(counts).filter(([, count]) => count > 0);

    if (entries.length === 0) {
        ctx.parentElement.innerHTML = `<p class="results-empty">Keine Maßnahmen eingesetzt.</p>`;
        return;
    }

    if (factorsChart) { factorsChart.destroy(); factorsChart = null; }

    factorsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: entries.map(([type]) => eventTypes[type].label),
            datasets: [{
                data: entries.map(([, count]) => count),
                backgroundColor: entries.map(([type]) => eventTypes[type].color),
                borderWidth: 2,
                borderColor: '#f7f7f7',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: item => `${item.label}: ${item.raw}` } }
            }
        }
    });

    document.getElementById('results-factors-legend').innerHTML = entries.map(([type, count]) => `
        <div class="results-legend-item">
            <span class="results-legend-dot" style="background: ${eventTypes[type].color}"></span>
            <span>${eventTypes[type].label}</span>
            <span class="results-legend-count">${count}x</span>
        </div>
    `).join('');
}

//---------- FinalScore ----------//

function getFinalScore() {
    for (const year of [2023, 2022, 2021, 2020, 2019]) {
        const scores = simState.lifeEvalScores[year];
        if (scores && scores.length > 0) return scores.at(-1);
    }

    return 0;
}

//---------- FinalYear ----------//

function getFinalYear() {
    for (const year of [2023, 2022, 2021, 2020, 2019]) {
        const scores = simState.lifeEvalScores[year];
        if (scores && scores.length > 0) return year;
    }

    return 2019;
}