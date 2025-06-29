using Microsoft.AspNetCore.Mvc;
using Movieflix_Backend.Models;

namespace Movieflix_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly MoviesConfig _config;

        public MoviesController(IHttpClientFactory httpClientFactory, MoviesConfig config)
        {
            _httpClient = httpClientFactory.CreateClient();
            _config = config;
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularMovies()
        {
            var response = await _httpClient.GetAsync($"{_config.BaseUrl}/movie/popular?api_key={_config.ApiKey}");
            var json = await response.Content.ReadAsStringAsync();
            return Content(json, "application/json");
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string query)
        {
            var response = await _httpClient.GetAsync($"{_config.BaseUrl}/search/movie?api_key={_config.ApiKey}&query={query}");
            var json = await response.Content.ReadAsStringAsync();
            return Content(json, "application/json");
        }
    }
}
