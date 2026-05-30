export function generatePRComment(receipt) {
    const statusEmoji = getStatusEmoji(receipt.status);
    const summary = getStatusSummary(receipt.status);
    let comment = `## Formation Gate Report ${statusEmoji}\n\n`;
    comment += `**Status:** ${receipt.status}\n\n`;
    comment += `${summary}\n\n`;
    comment += `### Proof-Only Diagnostic\n\n`;
    comment += `This is a diagnostic report only. It does not approve, reject, or block any changes.\n`;
    comment += `No automatic merging, deployment, or publication will occur.\n\n`;
    comment += `### Checks\n\n`;
    for (const check of receipt.checks) {
        const checkEmoji = getCheckEmoji(check.status);
        comment += `- ${checkEmoji} **${check.name}**: ${check.message}\n`;
    }
    if (receipt.knownGaps.length > 0) {
        comment += `\n### Known Gaps\n\n`;
        for (const gap of receipt.knownGaps) {
            comment += `- ${gap}\n`;
        }
    }
    comment += `\n### Receipt\n\n`;
    comment += `**Tool:** ${receipt.toolName} v${receipt.toolVersion}\n`;
    comment += `**Generated:** ${receipt.generatedAt}\n`;
    comment += `**Hash:** ${receipt.receiptHash}\n`;
    comment += `**Proof-Only:** ${receipt.proofOnly}\n`;
    comment += `**Execution Authority:** ${receipt.executionAuthority}\n`;
    return comment;
}
function getStatusEmoji(status) {
    switch (status) {
        case 'PASS':
            return '✅';
        case 'FAILED':
            return '❌';
        case 'UNVERIFIED':
            return '⚠️';
        case 'SKIPPED':
            return '⏭️';
        default:
            return '❓';
    }
}
function getCheckEmoji(status) {
    return getStatusEmoji(status);
}
function getStatusSummary(status) {
    switch (status) {
        case 'PASS':
            return 'All checks passed. Code formation evidence is present.';
        case 'FAILED':
            return 'Some checks failed. Review the failed checks below.';
        case 'UNVERIFIED':
            return 'Some checks could not be verified due to missing evidence.';
        case 'SKIPPED':
            return 'All checks were skipped.';
        default:
            return 'Unable to determine status.';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHItY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wci1jb21tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxPQUFnQjtJQUNoRCxNQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELE1BQU0sT0FBTyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVqRCxJQUFJLE9BQU8sR0FBRyw0QkFBNEIsV0FBVyxNQUFNLENBQUM7SUFDNUQsT0FBTyxJQUFJLGVBQWUsT0FBTyxDQUFDLE1BQU0sTUFBTSxDQUFDO0lBQy9DLE9BQU8sSUFBSSxHQUFHLE9BQU8sTUFBTSxDQUFDO0lBQzVCLE9BQU8sSUFBSSwrQkFBK0IsQ0FBQztJQUMzQyxPQUFPLElBQUksd0ZBQXdGLENBQUM7SUFDcEcsT0FBTyxJQUFJLGtFQUFrRSxDQUFDO0lBQzlFLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQztJQUU1QixLQUFLLE1BQU0sS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNuQyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLE9BQU8sSUFBSSxLQUFLLFVBQVUsTUFBTSxLQUFLLENBQUMsSUFBSSxPQUFPLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQztJQUNyRSxDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNqQyxPQUFPLElBQUksc0JBQXNCLENBQUM7UUFDbEMsS0FBSyxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEMsT0FBTyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLElBQUksbUJBQW1CLENBQUM7SUFDL0IsT0FBTyxJQUFJLGFBQWEsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsV0FBVyxJQUFJLENBQUM7SUFDckUsT0FBTyxJQUFJLGtCQUFrQixPQUFPLENBQUMsV0FBVyxJQUFJLENBQUM7SUFDckQsT0FBTyxJQUFJLGFBQWEsT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUFDO0lBQ2hELE9BQU8sSUFBSSxtQkFBbUIsT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDO0lBQ3BELE9BQU8sSUFBSSw0QkFBNEIsT0FBTyxDQUFDLGtCQUFrQixJQUFJLENBQUM7SUFFdEUsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLE1BQW1CO0lBQ3pDLFFBQVEsTUFBTSxFQUFFLENBQUM7UUFDZixLQUFLLE1BQU07WUFDVCxPQUFPLEdBQUcsQ0FBQztRQUNiLEtBQUssUUFBUTtZQUNYLE9BQU8sR0FBRyxDQUFDO1FBQ2IsS0FBSyxZQUFZO1lBQ2YsT0FBTyxJQUFJLENBQUM7UUFDZCxLQUFLLFNBQVM7WUFDWixPQUFPLElBQUksQ0FBQztRQUNkO1lBQ0UsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0FBQ0gsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLE1BQW1CO0lBQ3hDLE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFFRCxTQUFTLGdCQUFnQixDQUFDLE1BQW1CO0lBQzNDLFFBQVEsTUFBTSxFQUFFLENBQUM7UUFDZixLQUFLLE1BQU07WUFDVCxPQUFPLHdEQUF3RCxDQUFDO1FBQ2xFLEtBQUssUUFBUTtZQUNYLE9BQU8scURBQXFELENBQUM7UUFDL0QsS0FBSyxZQUFZO1lBQ2YsT0FBTyw0REFBNEQsQ0FBQztRQUN0RSxLQUFLLFNBQVM7WUFDWixPQUFPLDBCQUEwQixDQUFDO1FBQ3BDO1lBQ0UsT0FBTyw2QkFBNkIsQ0FBQztJQUN6QyxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY2VpcHQsIENoZWNrU3RhdHVzIH0gZnJvbSAnLi90eXBlcy5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVBSQ29tbWVudChyZWNlaXB0OiBSZWNlaXB0KTogc3RyaW5nIHtcbiAgY29uc3Qgc3RhdHVzRW1vamkgPSBnZXRTdGF0dXNFbW9qaShyZWNlaXB0LnN0YXR1cyk7XG4gIGNvbnN0IHN1bW1hcnkgPSBnZXRTdGF0dXNTdW1tYXJ5KHJlY2VpcHQuc3RhdHVzKTtcbiAgXG4gIGxldCBjb21tZW50ID0gYCMjIEZvcm1hdGlvbiBHYXRlIFJlcG9ydCAke3N0YXR1c0Vtb2ppfVxcblxcbmA7XG4gIGNvbW1lbnQgKz0gYCoqU3RhdHVzOioqICR7cmVjZWlwdC5zdGF0dXN9XFxuXFxuYDtcbiAgY29tbWVudCArPSBgJHtzdW1tYXJ5fVxcblxcbmA7XG4gIGNvbW1lbnQgKz0gYCMjIyBQcm9vZi1Pbmx5IERpYWdub3N0aWNcXG5cXG5gO1xuICBjb21tZW50ICs9IGBUaGlzIGlzIGEgZGlhZ25vc3RpYyByZXBvcnQgb25seS4gSXQgZG9lcyBub3QgYXBwcm92ZSwgcmVqZWN0LCBvciBibG9jayBhbnkgY2hhbmdlcy5cXG5gO1xuICBjb21tZW50ICs9IGBObyBhdXRvbWF0aWMgbWVyZ2luZywgZGVwbG95bWVudCwgb3IgcHVibGljYXRpb24gd2lsbCBvY2N1ci5cXG5cXG5gO1xuICBjb21tZW50ICs9IGAjIyMgQ2hlY2tzXFxuXFxuYDtcblxuICBmb3IgKGNvbnN0IGNoZWNrIG9mIHJlY2VpcHQuY2hlY2tzKSB7XG4gICAgY29uc3QgY2hlY2tFbW9qaSA9IGdldENoZWNrRW1vamkoY2hlY2suc3RhdHVzKTtcbiAgICBjb21tZW50ICs9IGAtICR7Y2hlY2tFbW9qaX0gKioke2NoZWNrLm5hbWV9Kio6ICR7Y2hlY2subWVzc2FnZX1cXG5gO1xuICB9XG5cbiAgaWYgKHJlY2VpcHQua25vd25HYXBzLmxlbmd0aCA+IDApIHtcbiAgICBjb21tZW50ICs9IGBcXG4jIyMgS25vd24gR2Fwc1xcblxcbmA7XG4gICAgZm9yIChjb25zdCBnYXAgb2YgcmVjZWlwdC5rbm93bkdhcHMpIHtcbiAgICAgIGNvbW1lbnQgKz0gYC0gJHtnYXB9XFxuYDtcbiAgICB9XG4gIH1cblxuICBjb21tZW50ICs9IGBcXG4jIyMgUmVjZWlwdFxcblxcbmA7XG4gIGNvbW1lbnQgKz0gYCoqVG9vbDoqKiAke3JlY2VpcHQudG9vbE5hbWV9IHYke3JlY2VpcHQudG9vbFZlcnNpb259XFxuYDtcbiAgY29tbWVudCArPSBgKipHZW5lcmF0ZWQ6KiogJHtyZWNlaXB0LmdlbmVyYXRlZEF0fVxcbmA7XG4gIGNvbW1lbnQgKz0gYCoqSGFzaDoqKiAke3JlY2VpcHQucmVjZWlwdEhhc2h9XFxuYDtcbiAgY29tbWVudCArPSBgKipQcm9vZi1Pbmx5OioqICR7cmVjZWlwdC5wcm9vZk9ubHl9XFxuYDtcbiAgY29tbWVudCArPSBgKipFeGVjdXRpb24gQXV0aG9yaXR5OioqICR7cmVjZWlwdC5leGVjdXRpb25BdXRob3JpdHl9XFxuYDtcblxuICByZXR1cm4gY29tbWVudDtcbn1cblxuZnVuY3Rpb24gZ2V0U3RhdHVzRW1vamkoc3RhdHVzOiBDaGVja1N0YXR1cyk6IHN0cmluZyB7XG4gIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgY2FzZSAnUEFTUyc6XG4gICAgICByZXR1cm4gJ+KchSc7XG4gICAgY2FzZSAnRkFJTEVEJzpcbiAgICAgIHJldHVybiAn4p2MJztcbiAgICBjYXNlICdVTlZFUklGSUVEJzpcbiAgICAgIHJldHVybiAn4pqg77iPJztcbiAgICBjYXNlICdTS0lQUEVEJzpcbiAgICAgIHJldHVybiAn4o+t77iPJztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICfinZMnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoZWNrRW1vamkoc3RhdHVzOiBDaGVja1N0YXR1cyk6IHN0cmluZyB7XG4gIHJldHVybiBnZXRTdGF0dXNFbW9qaShzdGF0dXMpO1xufVxuXG5mdW5jdGlvbiBnZXRTdGF0dXNTdW1tYXJ5KHN0YXR1czogQ2hlY2tTdGF0dXMpOiBzdHJpbmcge1xuICBzd2l0Y2ggKHN0YXR1cykge1xuICAgIGNhc2UgJ1BBU1MnOlxuICAgICAgcmV0dXJuICdBbGwgY2hlY2tzIHBhc3NlZC4gQ29kZSBmb3JtYXRpb24gZXZpZGVuY2UgaXMgcHJlc2VudC4nO1xuICAgIGNhc2UgJ0ZBSUxFRCc6XG4gICAgICByZXR1cm4gJ1NvbWUgY2hlY2tzIGZhaWxlZC4gUmV2aWV3IHRoZSBmYWlsZWQgY2hlY2tzIGJlbG93Lic7XG4gICAgY2FzZSAnVU5WRVJJRklFRCc6XG4gICAgICByZXR1cm4gJ1NvbWUgY2hlY2tzIGNvdWxkIG5vdCBiZSB2ZXJpZmllZCBkdWUgdG8gbWlzc2luZyBldmlkZW5jZS4nO1xuICAgIGNhc2UgJ1NLSVBQRUQnOlxuICAgICAgcmV0dXJuICdBbGwgY2hlY2tzIHdlcmUgc2tpcHBlZC4nO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gJ1VuYWJsZSB0byBkZXRlcm1pbmUgc3RhdHVzLic7XG4gIH1cbn1cbiJdfQ==