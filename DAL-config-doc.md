# DAL Custodian Configuration

Configuration options for the DAL on the **ProgramDetailPage** can be found in
``` /src/bento/programDetailData.js```
from line 37-68

```
{
      dataField: 'numberOfCaseFiles',
      header: 'Case File(s)',
      display: true,
      indicator: '',
      useImage: false,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/CaseFiles_.svg',
    },
    {
      dataField: 'numberOfStudyFiles',
      header: 'Study File(s)',
      display: true,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/StudyFiles_.svg',
    },
    {
      dataField: 'numberOfImageCollections',
      header: 'Image Collection(s)',
      display: true,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-ImageCollection.svg',
    },
    {
      dataField: 'numberOfPublications',
      header: 'Publication(s)',
      display: true,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-Publications.svg',
    },
    {
      dataField: 'numberOfCRDCNodes',
      header: 'icon',
      display: true,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-CRDCnodes.svg',
    }
```

Configuration options for the DAL on the **StudiesViewPage** can be found in
``` /src/bento/studiesData.js```
from line 53-102

```
{
      dataField: 'numberOfCaseFiles',
      header: 'Case File(s)',
      display: true,
      indicator: '',
      useImage: false,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/CaseFiles_.svg',
    },
    {
      dataField: 'numberOfStudyFiles',
      header: 'Study File(s)',
      display: true,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/StudyFiles_.svg',
    },
    {
      dataField: 'numberOfImageCollections',
      header: 'Image Collection(s)',
      display: true,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-ImageCollection.svg',
    },
    {
      dataField: 'numberOfPublications',
      header: 'Publication(s)',
      display: true,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-Publications.svg',
    },
    {
      dataField: 'numberOfCRDCNodes',
      header: 'icon',
      display: true,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-CRDCnodes.svg',
    }
```

### Config options
- display: Toggles on and off display of indicator.
- icon: accepts a path to an image for the indicator icon.
- header: text displayed in tooltip on hover.

To configure the order in which the indicators appear, just rearrange th order in the custodianConfig object.
eg: 

```    
{
      dataField: 'numberOfStudyFiles',
      header: 'Study File(s)',
      display: true,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/StudyFiles_.svg',
    },
    {
      dataField: 'numberOfImageCollections',
      header: 'Image Collection(s)',
      display: true,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-ImageCollection.svg',
    }, 
```

to 

```
    {
      dataField: 'numberOfImageCollections',
      header: 'Image Collection(s)',
      display: true,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/StudyDataAvail-ImageCollection.svg',
    },
    {
      dataField: 'numberOfStudyFiles',
      header: 'Study File(s)',
      display: true,
      icon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/master/icdc/images/svgs/StudyFiles_.svg',
    }, 
```

will switch positions.