function GetCrimeCategory(crime: string): string | undefined {
    const crimeCategoryMap = new Map<string, string>([
      ['AGG ASSAULT ON P/OFFICER', 'Assault'],
      ['AGGR ASSAULT', 'Assault'],
      ['ASSAULT', 'Assault'],
      ['Assault', 'Assault'],
      ['BURGLARY', 'Burglary'],
      ['Breaking & Entering', 'Burglary'],
      ['CRIM NEGLIGENT HOMICIDE', 'Killing'],
      ['Homicide', 'Killing'],
      ['MANSLAUGHTER', 'Killing'],
      ['MURDER', 'Killing'],
      ['LARCENY/THEFT', 'Theft'],
      ['ROBBERY', 'Theft'],
      ['Robbery', 'Theft'],
      ['THEFT OF SERVICES', 'Theft'],
      ['Theft', 'Theft'],
      ['Theft of Vehicle', 'Theft'],
      ['UUV', 'Theft'],
      ['Other Sexual Offense', 'Sexual Assault'],
      ['RAPE', 'Sexual Assault'],
      ['SEXUAL ABUSE', 'Sexual Assault'],
      ['SODOMY', 'Sexual Assault'],
      ['Sexual Assault', 'Sexual Assault'],
    ]);
  
    return crimeCategoryMap.get(crime);
  }
  
export default GetCrimeCategory;