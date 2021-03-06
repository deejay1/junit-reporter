import Report from '../src/Report';

describe('reports', () => {
  test('should find reports for given path', async () => {
    const report = new Report('**/samples/TEST-*.xml');
    await report.build();

    const names = report.getTestSuites().map((it) => it.name);

    expect(names.length).toEqual(4);
    expect(names).toContain('pl.failure.github.GitHubSpec');
    expect(names).toContain('pl.success.github.GitHubSpec');
    expect(names).toContain('jest tests');

    expect(report.hasTests()).toBeTruthy();
    expect(report.isSuccesfull()).toBeFalsy();
    expect(report.hasFailures()).toBeTruthy();
    expect(report.hasErrors()).toBeFalsy();
    expect(report.hasSkipped()).toBeFalsy();

    expect(report.counter.tests).toEqual(9);
    expect(report.counter.succesfull).toEqual(8);
    expect(report.counter.failures).toEqual(1);
    expect(report.counter.errors).toEqual(0);
    expect(report.counter.skipped).toEqual(0);
  });

  test('should return empty results when reports not found', async () => {
    const report = new Report('**/OTHER-*.xml');
    await report.build();

    expect(report.getTestSuites()).toEqual([]);
    expect(report.isSuccesfull()).toBeTruthy();
    expect(report.hasTests()).toBeFalsy();
    expect(report.hasFailures()).toBeFalsy();
    expect(report.hasErrors()).toBeFalsy();
    expect(report.hasSkipped()).toBeFalsy();

    expect(report.counter.tests).toEqual(0);
    expect(report.counter.succesfull).toEqual(0);
    expect(report.counter.failures).toEqual(0);
    expect(report.counter.errors).toEqual(0);
    expect(report.counter.skipped).toEqual(0);
  });

  test('should correctly handle skipped test (issue #41)', async () => {
    const report = new Report('**/samples/ISSUE-41.xml');
    await report.build();

    const names = report.getTestSuites().map((it) => it.name);

    expect(names.length).toEqual(1);
    expect(names).toContain(
      'pl.allegro.android.buyers.watched.internal.CoordinatorRepositoryTest'
    );

    expect(report.hasTests()).toBeTruthy();
    expect(report.isSuccesfull()).toBeTruthy();
    expect(report.hasFailures()).toBeFalsy();
    expect(report.hasErrors()).toBeFalsy();
    expect(report.hasSkipped()).toBeTruthy();

    expect(report.counter.tests).toEqual(8);
    expect(report.counter.succesfull).toEqual(7);
    expect(report.counter.failures).toEqual(0);
    expect(report.counter.errors).toEqual(0);
    expect(report.counter.skipped).toEqual(1);
  });
});
