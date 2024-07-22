import axios from 'axios';

const imdb = async (m, gss) => {
  try {
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['imdb'];

    if (!validCommands.includes(cmd)) return;

    if (!text) return m.reply('Give me a series or movie name');

    let fids = await axios.get(http://www.omdbapi.com/?apikey=742b2d09&t=${encodeURIComponent(text)}&plot=full);
    let imdbt = "";
    
    if (fids.data.Response === "False") {
      return m.reply('Movie or series not found');
    }

    imdbt += "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n";
    imdbt += " IMDB SEARCH\n";
    imdbt += "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
    imdbt += Title      : ${fids.data.Title}\n;
    imdbt += Year       : ${fids.data.Year}\n;
    imdbt += Rated      : ${fids.data.Rated}\n;
    imdbt += Released   : ${fids.data.Released}\n;
    imdbt += Runtime    : ${fids.data.Runtime}\n;
    imdbt += Genre      : ${fids.data.Genre}\n;
    imdbt += Director   : ${fids.data.Director}\n;
    imdbt += Writer     : ${fids.data.Writer}\n;
    imdbt += Actors     : ${fids.data.Actors}\n;
    imdbt += Plot       : ${fids.data.Plot}\n;
    imdbt += Language   : ${fids.data.Language}\n;
    imdbt += Country    : ${fids.data.Country}\n;
    imdbt += Awards     : ${fids.data.Awards}\n;
    imdbt += BoxOffice  : ${fids.data.BoxOffice}\n;
    imdbt += Production : ${fids.data.Production}\n;
    imdbt += imdbRating : ${fids.data.imdbRating}\n;
    imdbt += imdbVotes  : ${fids.data.imdbVotes}\n;

    await gss.sendMessage(m.from, {
      image: {
        url: fids.data.Poster,
      },
      caption: imdbt,
    }, {
      quoted: m,
    });
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while fetching the data.');
  }
};

export default imdb;
