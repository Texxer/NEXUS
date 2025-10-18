# DataSpell - Data Science IDE Tutorial

## What is DataSpell?

DataSpell is a JetBrains IDE dedicated to exploratory data analysis and machine learning model prototyping. It's optimized for notebooks, data visualization, and scientific computing.

**Supports**: Python, R, Jupyter Notebooks, SQL Queries  
**Version**: 2025.1 and later  
**Platform**: Windows, macOS, Linux

---

## Quick Start

### Installation
1. Download from [jetbrains.com/dataspell](https://www.jetbrains.com/dataspell/)
2. Install Anaconda or Miniconda (recommended)
3. Install DataSpell via Toolbox
4. Select Python/R environment on launch

### Create Jupyter Notebook

1. **New Notebook**:
   - Right-click workspace > New > Jupyter Notebook
   - Name: `analysis.ipynb`

2. **Create Cells**:
   - Code cells: Type Python/R code
   - Markdown cells: Documentation
   - Type selector in cell toolbar

3. **Execute**:
   - Run cell: Shift+Enter or Run button
   - Run all: Toolbar button
   - Variables panel shows live values

---

## Key Features

### Notebook Support
- Full Jupyter notebook editing
- Cell execution and output display
- Rich output (plots, tables, HTML)
- Code cells with full IDE features

### Code Assistance
- Code completion in cells
- Variable hints
- Library documentation
- Debugging with breakpoints

### Data Tools
- Data Explorer: Browse DataFrames visually
- SQL Console: Query databases
- Visualization: Matplotlib, Plotly, Seaborn
- Code profiler: Optimize slow code

### Environment Management
- Conda/Venv switching
- Package installation
- Environment recreation

### Deployment
- Export notebooks to scripts
- Convert to HTML reports
- Share analysis results

---

## Example Workflow

```
1. Create notebook
2. Import libraries:
   import pandas as pd
   import matplotlib.pyplot as plt

3. Load data:
   df = pd.read_csv('data.csv')
   df.head()

4. Analyze:
   df.describe()
   df.groupby('category').sum()

5. Visualize:
   plt.plot(df['x'], df['y'])
   plt.show()

6. Export as HTML report
```

---

## Resources
- Docs: [jetbrains.com/help/dataspell](https://www.jetbrains.com/help/dataspell/)
- Jupyter: [jupyter.org](https://jupyter.org/)
- Pandas: [pandas.pydata.org](https://pandas.pydata.org/)
