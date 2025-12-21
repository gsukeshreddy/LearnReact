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
            try
            {
                var response = await _httpClient.GetAsync($"{_config.BaseUrl}/movie/popular?api_key={_config.ApiKey}");
                var json = await response.Content.ReadAsStringAsync();
                if (!response.IsSuccessStatusCode || string.IsNullOrWhiteSpace(json))
                {
                    return Content("{\"results\":[],\"error\":\"Failed to fetch movies\"}", "application/json");
                }
                return Content(json, "application/json");
            }
            catch (Exception ex)
            {
                return Content($"{{\"results\":[],\"error\":\"{ex.Message}\"}}", "application/json");
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string query)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_config.BaseUrl}/search/movie?api_key={_config.ApiKey}&query={query}");
                var json = await response.Content.ReadAsStringAsync();
                if (!response.IsSuccessStatusCode || string.IsNullOrWhiteSpace(json))
                {
                    return Content("{\"results\":[],\"error\":\"Failed to search movies\"}", "application/json");
                }
                return Content(json, "application/json");
            }
            catch (Exception ex)
            {
                return Content($"{{\"results\":[],\"error\":\"{ex.Message}\"}}", "application/json");
            }
        }
    }
}
