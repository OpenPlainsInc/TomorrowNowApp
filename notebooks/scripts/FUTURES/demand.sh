# Demand
g.region vector=counties@PERMANENT align=landuse_2016@PERMANENT

r.mask raster='roads' maskcats=0

# We will use r.futures.demand which derives the population vs. development relation. The relation can be linear/logarithmic/logarithmic2/exponential/exponential approach. Look for examples of the different relations in the manual.

# linear: y = A + Bx  
# logarithmic: y = A + Bln(x)  
# logarithmic2: y = A + B * ln(x - C)        (requires SciPy)  
# exponential: y = Ae^(BX)  
# exp_approach: y = (1 - e^(-A(x - B))) + C        (requires SciPy)  

# The format of the input population CSV files is described in the manual. It is important to have synchronized categories of subregions and the column headers of the CSV files (in our case FIPS number). We can simply generate the list of years (for which demand is computed)with this Python code:

# years = ','.join([str(i) for i in range(2016, 2039)])

r.futures.demand development='urban_2001,urban_2006,urban_2011,urban_2016' subregions='counties' observed_population='population_trend.csv' projected_population='population_projection.csv' simulation_times='2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2035,2036,2037,2038' plot='plot_demand.png' demand='demand.csv' separator='comma' method='logarithmic,logarithmic2,exp_approach'

# Preprocess
# use logarithmic approach.