using Microsoft.AspNetCore.Mvc;

namespace AvalphaTechnologies.CommissionCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommisionController : ControllerBase
    {
        [ProducesResponseType(typeof(CommissionCalculationResponse), 200)]
        [HttpPost]
        public IActionResult Calculate(CommissionCalculationRequest calculationRequest)
        {
            if (calculationRequest.LocalSalesCount < 0 ||
                calculationRequest.ForeignSalesCount < 0 ||
                calculationRequest.AverageSaleAmount < 0)
            {
                return BadRequest("Inputs must be greather than 0.");
            }

            var avalphaLocal = 0.20m * calculationRequest.LocalSalesCount * calculationRequest.AverageSaleAmount;
            var avalphaForeign = 0.35m * calculationRequest.ForeignSalesCount * calculationRequest.AverageSaleAmount;
            var avalphaTotal = avalphaLocal + avalphaForeign;

            var competitorLocal = 0.02m * calculationRequest.LocalSalesCount * calculationRequest.AverageSaleAmount;
            var competitorForeign = 0.0755m * calculationRequest.ForeignSalesCount * calculationRequest.AverageSaleAmount;
            var competitorTotal = competitorLocal + competitorForeign;

            return Ok(new CommissionCalculationResponse()
            {
                LocalSalesCount = calculationRequest.LocalSalesCount,
                ForeignSalesCount = calculationRequest.ForeignSalesCount,
                AverageSaleAmount = calculationRequest.AverageSaleAmount,

                AvalphaLocalCommission = Math.Round(avalphaLocal, 2),
                AvalphaForeignCommission = Math.Round(avalphaForeign, 2),
                AvalphaTotalCommission = Math.Round(avalphaTotal, 2),

                CompetitorLocalCommission = Math.Round(competitorLocal, 2),
                CompetitorForeignCommission = Math.Round(competitorForeign, 2),
                CompetitorTotalCommission = Math.Round(competitorTotal, 2)
            });
        }
    }

    public class CommissionCalculationRequest
    {
        public int LocalSalesCount { get; set; }
        public int ForeignSalesCount { get; set; }
        public decimal AverageSaleAmount { get; set; }
    }

    public class CommissionCalculationResponse
    {
        public int LocalSalesCount { get; set; }
        public int ForeignSalesCount { get; set; }
        public decimal AverageSaleAmount { get; set; }

        public decimal AvalphaLocalCommission { get; set; }
        public decimal AvalphaForeignCommission { get; set; }
        public decimal AvalphaTotalCommission { get; set; }

        public decimal CompetitorLocalCommission { get; set; }
        public decimal CompetitorForeignCommission { get; set; }
        public decimal CompetitorTotalCommission { get; set; }
    }
}
